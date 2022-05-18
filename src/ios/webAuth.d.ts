import { Loggable } from './loggable';
import { Logger } from './logger';
import { ResponseType } from './responseType';
import { Trackable, Telemetry } from './telemetry';
import { Credentials } from '../common/credentials';
import { Result } from './result';
/**
 Auth0 iOS component for authenticating with web-based flow

 ```
 Auth0.webAuth(clientId: clientId, domain: "samples.auth0.com")
 ```

 - parameter clientId: id of your Auth0 client
 - parameter domain:   name of your Auth0 domain

 - returns: Auth0 WebAuth component
 */
/**
 Resumes the current Auth session (if any).

 - parameter url:     url received by iOS application in AppDelegate
 - parameter options: dictionary with launch options received by iOS application in AppDelegate

 - returns: if the url was handled by an on going session or not.
 */
export declare function resumeAuth(url: NSURL, options: NSDictionary<string, string>): boolean;
export declare abstract class WebAuth implements Trackable, Loggable {
    abstract readonly clientId: string;
    abstract readonly url: NSURL;
    abstract telemetry: Telemetry;
    abstract logger: Logger | undefined;
    /**
     For redirect url instead of a custom scheme it will use `https` and iOS 9 Universal Links.

     Before enabling this flag you'll need to configure Universal Links

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract useUniversalLink(): this;
    /**
     Specify a connection name to be used to authenticate.

     By default no connection is specified, so the hosted login page will be displayed

     - parameter connection: name of the connection to use

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract setConnection(connection: string): this;
    /**
     Scopes that will be requested during auth

     - parameter scope: a scope value like: `openid email`

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract setScope(scope: string): this;
    /**
     Provider scopes for oauth2/social connections. e.g. Facebook, Google etc

     - parameter connectionScope: oauth2/social comma separated scope list: `user_friends,email`

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract setConnectionScope(connectionScope: string): this;
    /**
     State value that will be echoed after authentication
     in order to check that the response is from your request and not other.

     By default a random value is used.

     - parameter state: a state value to send with the auth request

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract setState(state: string): this;
    /**
     Send additional parameters for authentication.

     - parameter parameters: additional auth parameters

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract setParameters(parameters: {
        [param: string]: string;
    }): this;
    abstract setResponseType(response: ResponseType[]): this;
    abstract setNonce(nonce: String): this;
    abstract setAudience(audience: String): this;
    /**
     Change the default grant used for auth from `code` (w/PKCE) to `token` (implicit grant)

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract usingImplicitGrant(): this;
    /**
     Use `SFSafariViewController` instead of `SFAuthenticationSession` for WebAuth
     in iOS 11.0+.

     - returns: the same WebAuth instance to allow method chaining
     */
    abstract useLegacyAuthentication(): this;
    /**
     Starts the WebAuth flow by modally presenting a ViewController in the top-most controller.

     ```
     Auth0
         .webAuth(clientId: clientId, domain: "samples.auth0.com")
         .start { result in
             print(result)
         }
     ```

     Then from `AppDelegate` we just need to resume the WebAuth Auth like this

     ```
     func application(app: UIApplication, openURL url: NSURL, options: [String : Any]) -> Bool {
         return Auth0.resumeAuth(url, options: options)
     }
     ```

     Any on going WebAuth Auth session will be automatically cancelled when starting a new one,
     and it's corresponding callback with be called with a failure result of `Authentication.Error.Cancelled`

     - parameter callback: callback called with the result of the WebAuth flow
     */
    abstract start(callback: (result: Result<Credentials>) => void): any;
    /**
     Removes Auth0 session and optionally remove the Identity Provider session.
     - seeAlso: [Auth0 Logout docs](https://auth0.com/docs/logout)

     For iOS 11+ you will need to ensure that the **Callback URL** has been added
     to the **Allowed Logout URLs** section of your application in the [Auth0 Dashboard](https://manage.auth0.com/#/applications/).


     ```
     Auth0
         .webAuth()
         .clearSession { print($0) }
     ```

     Remove Auth0 session and remove the IdP session.

     ```
     Auth0
         .webAuth()
         .clearSession(federated: true) { print($0) }
     ```

     - parameter federated: Bool to remove the IdP session
     - parameter callback: callback called with bool outcome of the call
     */
    abstract clearSession(federated: boolean, callback: (success: boolean) => void): any;
}
