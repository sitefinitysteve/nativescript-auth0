import { device } from 'tns-core-modules/platform';

import { ControllerModalPresenter } from './controllerModalPresenter';
import { Credentials } from './credentials';
import { Logger } from './logger';
import { ResponseType } from './responseType';
import { Telemetry } from './telemetry';
import { TransactionStore } from './transactionStore';
import { WebAuth } from './webAuth';

export class SafariWebAuth extends WebAuth {

    static NoBundleIdentifier = 'com.auth0.this-is-no-bundle';

    public readonly clientId: string;
    public readonly url: URL;
    public telemetry: Telemetry;

    public readonly presenter: ControllerModalPresenter;
    public readonly storage: TransactionStore;
    public logger: Logger | undefined;
    public parameters: { [param: string]: string } = {};
    public universalLink = false;
    public responseType: [ResponseType] = [ResponseType.code];
    public nonce: string | undefined;
    private authenticationSession: boolean = true;

    public static init(clientId: string, url: URL, presenter: ControllerModalPresenter = new ControllerModalPresenter(), telemetry: Telemetry = new Telemetry()): SafariWebAuth {
        return new SafariWebAuth(clientId, url, presenter, TransactionStore.shared, telemetry);
    }

    constructor(clientId: string, url: URL, presenter: ControllerModalPresenter, storage: TransactionStore, telemetry: Telemetry) {
        super();
        this.clientId = clientId;
        this.url = url;
        this.presenter = presenter;
        this.storage = storage;
        this.telemetry = telemetry;
    }

    public useUniversalLink(): this {
        this.universalLink = true;
        return this;
    }

    public setConnection(connection: string): this {
        this.parameters["connection"] = connection;
        return this;
    }

    public setScope(scope: string): this {
        this.parameters["scope"] = scope;
        return this;
    }

    public setConnectionScope(connectionScope: string): this {
        this.parameters["connection_scope"] = connectionScope;
        return this;
    }

    public setState(state: string): this {
        this.parameters["state"] = state;
        return this;
    }

    public setParameters(parameters: { [param: string]: string }): this {
        for (const key in parameters) {
            this.parameters[key] = parameters[key];
        }
        return this;
    }

    public setResponseType(responseType: [ResponseType]): this {
        this.responseType = responseType;
        return this;
    }

    public setNonce(nonce: string): this {
        this.nonce = nonce;
        return this;
    }

    public usingImplicitGrant(): this {
        return this.setResponseType([ResponseType.token]);
    }

    public setAudience(audience: string): this {
        this.parameters["audience"] = audience;
        return this;
    }

    public useLegacyAuthentication(): this {
        this.authenticationSession = false;
        return this;
    }

    public start(callback: (result: Result<Credentials>) => void) {
        guard
            let redirectURL = this.redirectURL, !redirectURL.absoluteString.hasPrefix(SafariWebAuth.NoBundleIdentifier)
            else {
                return callback(Result.failure(error: WebAuthError.noBundleIdentifierFound))
        }
        if this.responseType.contains(.idToken) {
            guard this.nonce != nil else { return callback(Result.failure(error: WebAuthError.noNonceProvided)) }
        }
        let handler = this.handler(redirectURL)
        let state = this.parameters["state"] ?? generateDefaultState()
        let authorizeURL = this.buildAuthorizeURL(withRedirectURL: redirectURL, defaults: handler.defaults, state: state)

        if (Number(device.osVersion) >= 11.0 && this.authenticationSession) {
            let session = SafariAuthenticationSession(authorizeURL: authorizeURL, redirectURL: redirectURL, state: state, handler: handler, finish: callback, logger: logger)
            logger?.trace(url: authorizeURL, source: "SafariAuthenticationSession")
            this.storage.store(session)
        } else {
            const [controller, finish] = newSafari(authorizeURL, callback);
            let session = SafariSession(controller: controller, redirectURL: redirectURL, state: state, handler: handler, finish: finish, logger: this.logger)
            controller.delegate = session
            this.presenter.present(controller: controller)
            logger?.trace(url: authorizeURL, source: "Safari")
            this.storage.store(session)
        }
    }

    public newSafari(_ authorizeURL: URL, callback: @escaping (Result<Credentials>) -> Void) -> (SFSafariViewController, (Result<Credentials>) -> Void) {
        let controller = SFSafariViewController(url: authorizeURL)
        let finish: (Result<Credentials>) -> Void = { [weak controller] (result: Result<Credentials>) -> Void in
            guard let presenting = controller?.presentingViewController else {
                return callback(Result.failure(error: WebAuthError.cannotDismissWebAuthController))
            }

            if case .failure(let cause as WebAuthError) = result, case .userCancelled = cause {
                DispatchQueue.main.async {
                    callback(result)
                }
            } else {
                DispatchQueue.main.async {
                    presenting.dismiss(animated: true) {
                        callback(result)
                    }
                }
            }
        }
        return (controller, finish)
    }

    public buildAuthorizeURL(withRedirectURL redirectURL: URL, defaults: [String: String], state: String?) -> URL {
        let authorize = URL(string: "/authorize", relativeTo: this.url)!
        var components = URLComponents(url: authorize, resolvingAgainstBaseURL: true)!
        var items: [URLQueryItem] = []
        var entries = defaults
        entries["client_id"] = this.clientId
        entries["redirect_uri"] = redirectURL.absoluteString
        entries["scope"] = "openid"
        entries["state"] = state
        entries["response_type"] = this.responseType.map { $0.label! }.joined(separator: " ")
        if this.responseType.contains(.idToken) {
            entries["nonce"] = this.nonce
        }
        this.parameters.forEach { entries[$0] = $1 }

        entries.forEach { items.append(URLQueryItem(name: $0, value: $1)) }
        components.queryItems = this.telemetry.queryItemsWithTelemetry(queryItems: items)
        return components.url!
    }

    public handler(redirectURL: URL): OAuth2Grant {
        if this.responseType.contains([.code]) {
            var authentication = Auth0Authentication(clientId: this.clientId, url: this.url, telemetry: this.telemetry)
            authentication.logger = this.logger
            return PKCE(authentication: authentication, redirectURL: redirectURL, reponseType: this.responseType, nonce: this.nonce)
        } else {
            return ImplicitGrant(responseType: this.responseType, nonce: this.nonce)
        }
    }

    var redirectURL: URL? {
        let bundleIdentifier = Bundle.main.bundleIdentifier ?? SafariWebAuth.NoBundleIdentifier
        var components = URLComponents(url: this.url, resolvingAgainstBaseURL: true)
        components?.scheme = this.universalLink ? "https" : bundleIdentifier
        return components?.url?
            .appendingPathComponent("ios")
            .appendingPathComponent(bundleIdentifier)
            .appendingPathComponent("callback")
    }

    public clearSession(federated: boolean, callback: (success: boolean) => void) {
        let logoutURL = federated ? URL(string: "/v2/logout?federated", relativeTo: this.url)! : URL(string: "/v2/logout", relativeTo: this.url)!
        if (Number(device.osVersion) >= 11.0 && this.authenticationSession) {
            let returnTo = URLQueryItem(name: "returnTo", value: this.redirectURL?.absoluteString)
            let clientId = URLQueryItem(name: "client_id", value: this.clientId)
            var components = URLComponents(url: logoutURL, resolvingAgainstBaseURL: true)
            let queryItems = components?.queryItems ?? []
            components?.queryItems = queryItems + [returnTo, clientId]
            guard let clearSessionURL = components?.url, let redirectURL = returnTo.value else {
                return callback(false)
            }
            let clearSession = SafariAuthenticationSessionCallback(url: clearSessionURL, schemeURL: redirectURL, callback: callback)
            this.storage.store(clearSession)
        } else {
            let controller = SilentSafariViewController(url: logoutURL) { callback($0) }
            logger?.trace(url: logoutURL, source: "Safari")
            this.presenter.present(controller: controller)
        }
    }
}

function generateDefaultState(): string | undefined {
    let data = Data(count: 32)
    let tempData = data

    let result = tempData.withUnsafeMutableBytes { (bytes: UnsafeMutablePointer<UInt8>) -> Int in
        return Int(SecRandomCopyBytes(kSecRandomDefault, data.count, bytes))
    }

    if (result != 0) {
        return undefined;
    }
    return tempData.a0_encodeBase64URLSafe()
}
