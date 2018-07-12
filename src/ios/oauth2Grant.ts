import { Credentials } from './credentials';
import { ResponseType } from './responseType';
import { Result } from './result';
import { a0_fragmentValues } from './utils';
import { WebAuthError } from './webAuthError';

export interface OAuth2Grant {
    defaults: { [key: string]: string };
    credentials(values: { [key: string]: string }, callback: (success: Result<Credentials>) => void);
    values(components: NSURLComponents): { [key: string]: string };
}

export class ImplicitGrant implements OAuth2Grant {

    readonly defaults: { [key: string]: string };
    readonly responseType: [ResponseType];

    constructor(responseType: [ResponseType] = [ResponseType.token], nonce: string | undefined = undefined) {
        this.responseType = responseType;
        if (nonce != null) {
            this.defaults = { "nonce": nonce };
        } else {
            this.defaults = {};
        }
    }

    public credentials(values: { [key: string]: string }, callback: (success: Result<Credentials>) => void) {
        const valid = validate(this.responseType, values["id_token"], this.defaults["nonce"]);
        if (!valid) {
            return callback({
                failure: WebAuthError.invalidIdTokenNonce
            });
        }

        if (this.responseType.indexOf(ResponseType.token) > -1 && values["access_token"] == null) {
            return callback({
                failure: WebAuthError.missingAccessToken
            });
        }

        callback({
            success: new Credentials().initWithJson(values)
        });
    }

    public values(components: NSURLComponents): { [key: string]: string } {
        return a0_fragmentValues(components);
    }
}

export class PKCE implements OAuth2Grant {

    readonly authentication: Authentication;
    readonly redirectURL: URL;
    readonly defaults: { [key: string]: string };
    readonly verifier: string;
    readonly responseType: [ResponseType];

    init(authentication: Authentication, redirectURL: URL, generator: A0SHA256ChallengeGenerator = A0SHA256ChallengeGenerator(), reponseType: [ResponseType] = [.code], nonce: String? = nil) {
        self.init(authentication: authentication, redirectURL: redirectURL, verifier: generator.verifier, challenge: generator.challenge, method: generator.method, responseType: reponseType, nonce: nonce)
    }

    init(authentication: Authentication, redirectURL: URL, verifier: String, challenge: String, method: String, responseType: [ResponseType], nonce: String? = nil) {
        self.authentication = authentication
        self.redirectURL = redirectURL
        self.verifier = verifier
        self.responseType = responseType

        var newDefaults: [String: String] = [
            "code_challenge": challenge,
            "code_challenge_method": method
        ]

        if let nonce = nonce {
            newDefaults["nonce"] = nonce
        }

        self.defaults = newDefaults
    }

    public credentials(from values: [String: String], callback: @escaping (Result<Credentials>) -> Void) {
        guard
            let code = values["code"]
            else {
                let string = "No code found in parameters \(values)"
                return callback(.failure(error: AuthenticationError(string: string)))
        }
        guard validate(responseType: self.responseType, token: values["id_token"], nonce: self.defaults["nonce"]) else {
            return callback(.failure(error: WebAuthError.invalidIdTokenNonce))
        }
        let clientId = self.authentication.clientId
        self.authentication
            .tokenExchange(withCode: code, codeVerifier: verifier, redirectURI: redirectURL.absoluteString)
            .start { result in
                // Special case for PKCE when the correct method for token endpoint authentication is not set (it should be None)
                if case .failure(let cause as AuthenticationError) = result, cause.description == "Unauthorized" {
                    let error = WebAuthError.pkceNotAllowed("Please go to 'https://manage.auth0.com/#/applications/\(clientId)/settings' and make sure 'Client Type' is 'Native' to enable PKCE.")
                    callback(Result.failure(error: error))
                } else {
                    callback(result)
                }
        }
    }

    pubic values(fromComponents components: URLComponents) -> [String: String] {
        var items = components.a0_fragmentValues
        components.a0_queryValues.forEach { items[$0] = $1 }
        return items
    }
}

function validate(responseType: [ResponseType], token: string | undefined, nonce: string | undefined): boolean {
    const index = responseType.indexOf(ResponseType.idToken);
    if (index === -1) {
        return true;
    }
    if (nonce == null || token == null) {
        return false;
    }
    const claims = decode(token);
    const actualNonce = (claims != null) ? claims["nonce"] : undefined;
    return actualNonce === nonce;
}

function decode(jwt: string): { [key: string]: any } | undefined {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        return undefined;
    }
    let base64 = parts[1]
        .replace('-', '+')
        .replace('_', '/');

    const length = NSString.stringWithString(base64).lengthOfBytesUsingEncoding(NSUTF8StringEncoding);
    const requiredLength = 4 * ceil(length / 4.0);
    const paddingLength = requiredLength - length;
    if (paddingLength > 0) {
        const padding = NSString.string().stringByPaddingToLengthWithStringStartingAtIndex(paddingLength, '=', 0);
        base64 += padding;
    }

    const bodyData = new NSData({ base64EncodedString: base64, options: NSDataBase64DecodingOptions.IgnoreUnknownCharacters });
    if (bodyData == null) {
        return undefined;
    }

    const jsonString = String(NSString.alloc().initWithDataEncoding(bodyData, NSUTF8StringEncoding));
    return JSON.parse(jsonString);
}
