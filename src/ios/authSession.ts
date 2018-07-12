import { AuthTransaction } from './authTransaction';
import { Credentials } from './credentials';
import { Logger } from './logger';
import { Result } from './result';

type FinishSession = (result: Result<Credentials>) => void;

export class AuthSession implements AuthTransaction {

    readonly redirectURL: URL;
    readonly state: string | undefined;
    readonly finish: FinishSession;
    readonly handler: OAuth2Grant;
    readonly logger: Logger | undefined;

    constructor(
        redirectURL: URL,
        state: string | undefined = undefined,
        handler: OAuth2Grant,
        finish: FinishSession,
        logger: Logger | undefined
    ) {
        this.redirectURL = redirectURL;
        this.state = state;
        this.finish = finish;
        this.handler = handler;
        this.logger = logger;
    }

    /**
     Tries to resume (and complete) the OAuth2 session from the received URL

     - parameter url:     url received in application's AppDelegate
     - parameter options: a dictionary of launch options received from application's AppDelegate

     - returns: `true` if the url completed (successfuly or not) this session, `false` otherwise
     */
    func resume(_ url: URL, options: [UIApplicationOpenURLOptionsKey: Any] = [:]) -> Bool {
        this.logger?.trace(url: url, source: "iOS Safari")
        guard url.absoluteString.lowercased().hasPrefix(this.redirectURL.absoluteString.lowercased()) else { return false }

        guard
            let components = URLComponents(url: url, resolvingAgainstBaseURL: true)
            else {
                this.finish(.failure(error: AuthenticationError(string: url.absoluteString, statusCode: 200)))
                return false
            }
        var items = this.handler.values(fromComponents: components)
        guard has(state: this.state, inItems: items) else { return false }
        if items["error"] != nil {
            this.finish(.failure(error: AuthenticationError(info: items, statusCode: 0)))
        } else {
            this.handler.credentials(from: items, callback: this.finish)
        }
        return true
    }

    func cancel() {
        this.finish(Result.failure(error: WebAuthError.userCancelled))
    }

    private func has(state: String?, inItems items: [String: String]) -> Bool {
        return state == nil || items["state"] == state
    }
}