import { AuthenticationException } from './authenticationException';
import { Auth0 } from '../auth0';
import { UserInfo } from '../../common/userInfo';
import { DatabaseUser } from '../../common/databaseUser';
import { Request } from '../request/request';
import { ParameterizableRequest } from '../request/parameterizableRequest';
import { Credentials } from '../../common/credentials';
import { AuthenticationRequest } from '../request/authenticationRequest';
import { RequestFactory } from '../request/internal/requestFactory';
import { DatabaseConnectionRequest } from './request/databaseConnectionRequest';
import { ProfileRequest } from './request/profileRequest';
import { SignUpRequest } from './request/signUpRequest';
import { TokenRequest } from './request/tokenRequest';
/**
 * API client for Auth0 Authentication API.
 * <pre>
 * {@code
 * Auth0 auth0 = new Auth0("your_client_id", "your_domain");
 * AuthenticationAPIClient client = new AuthenticationAPIClient(auth0);
 * }
 * </pre>
 *
 * @see <a href="https://auth0.com/docs/auth-api">Auth API docs</a>
 */
export declare class AuthenticationAPIClient {
    private static readonly USERNAME_KEY;
    private static readonly PASSWORD_KEY;
    private static readonly EMAIL_KEY;
    private static readonly OAUTH_CODE_KEY;
    private static readonly REDIRECT_URI_KEY;
    private static readonly TOKEN_KEY;
    private static readonly MFA_TOKEN_KEY;
    private static readonly ONE_TIME_PASSWORD_KEY;
    private static readonly SIGN_UP_PATH;
    private static readonly DB_CONNECTIONS_PATH;
    private static readonly CHANGE_PASSWORD_PATH;
    private static readonly OAUTH_PATH;
    private static readonly TOKEN_PATH;
    private static readonly USER_INFO_PATH;
    private static readonly REVOKE_PATH;
    private static readonly HEADER_AUTHORIZATION;
    private readonly auth0;
    private readonly factory;
    private readonly authErrorBuilder;
    /**
     * Creates a new API client instance providing Auth0 account info.
     *
     * @param auth0 account information
     */
    constructor(auth0: Auth0, factory?: RequestFactory);
    getClientId(): string;
    getBaseURL(): string;
    /**
     * Set the value of 'User-Agent' header for every request to Auth0 Authentication API
     *
     * @param userAgent value to send in every request to Auth0
     */
    setUserAgent(userAgent: string): void;
    /**
     * Log in a user with email/username and password for a connection/realm.
     * It will use the password-realm grant type for the {@code /oauth/token} endpoint.
     * Example:
     * <pre>
     * {@code
     * client
     *      .login("{username or email}", "{password}", "{database connection name}")
     *      .start(new BaseCallback<Credentials>() {
     *          {@literal}Override
     *          public onSuccess(Credentials payload): void { }
     *
     *          {@literal}Override
     *          public onFailure(AuthenticationException error): void { }
     *      });
     * }
     * </pre>
     *
     * @param usernameOrEmail   of the user depending of the type of DB connection
     * @param password          of the user
     * @param realmOrConnection realm to use in the authorize flow or the name of the database to authenticate with.
     * @return a request to configure and start that will yield {@link Credentials}
     */
    login(usernameOrEmail: string, password: string, realmOrConnection?: string): AuthenticationRequest;
    /**
     * Log in a user using the One Time Password code after they have received the 'mfa_required' error.
     * The MFA token tells the server the username or email, password and realm values sent on the first request.
     * Requires your client to have the <b>MFA</b> Grant Type enabled. See <a href="https://auth0.com/docs/clients/client-grant-types">Client Grant Types</a> to learn how to enable it.* Example usage:
     * <pre>
     * {@code
     * client.loginWithOTP("{mfa token}", "{one time password}")
     *      .start(new BaseCallback<Credentials>() {
     *          {@literal}Override
     *          public onSuccess(Credentials payload): void { }
     *
     *          {@literal}Override
     *          public onFailure(AuthenticationException error): void { }
     *      });
     * }
     * </pre>
     *
     * @param mfaToken the token received in the previous {@link #login(String, String, String)} response.
     * @param otp      the one time password code provided by the resource owner, typically obtained from an
     *                 MFA application such as Google Authenticator or Guardian.
     * @return a request to configure and start that will yield {@link Credentials}
     */
    loginWithOTP(mfaToken: string, otp: string): AuthenticationRequest;
    /**
     * Returns the information of the user associated with the given access_token.
     * Example usage:
     * <pre>
     * {@code
     * client.userInfo("{access_token}")
     *      .start(new BaseCallback<UserProfile>() {
     *          {@literal}Override
     *          public onSuccess(UserProfile payload): void { }
     *
     *          {@literal}@Override
     *          public onFailure(AuthenticationException error): void { }
     *      });
     * }
     * </pre>
     *
     * @param accessToken used to fetch it's information
     * @return a request to start
     */
    userInfo(accessToken: string): Request<UserInfo, AuthenticationException>;
    /**
     * Creates a user in a DB connection using <a href="https://auth0.com/docs/api/authentication#signup">'/dbconnections/signup' endpoint</a>
     * Example usage:
     * <pre>
     * {@code
     * client.createUser("{email}", "{password}", "{username}", "{database connection name}")
     *      .start(new BaseCallback<DatabaseUser>() {
     *          {@literal}Override
     *          public onSuccess(DatabaseUser payload): void { }
     *
     *          {@literal}@Override
     *          public onFailure(AuthenticationException error): void { }
     *      });
     * }
     * </pre>
     *
     * @param email      of the user and must be non null
     * @param password   of the user and must be non null
     * @param username   of the user and must be non null
     * @param connection of the database to create the user on
     * @return a request to start
     */
    createUser(email: string, password: string, username: string | undefined, connection: string): DatabaseConnectionRequest<DatabaseUser, AuthenticationException>;
    /**
     * Creates a user in a DB connection using <a href="https://auth0.com/docs/api/authentication#signup">'/dbconnections/signup' endpoint</a>
     * and then logs in the user.
     * Example usage:
     * <pre>
     * {@code
     * client.signUp("{email}", "{password}", "{username}", "{database connection name}")
     *      .start(new BaseCallback<Credentials>() {
     *          {@literal}Override
     *          public onSuccess(Credentials payload): void {}
     *
     *          {@literal}Override
     *          public onFailure(AuthenticationException error): void {}
     *      });
     * }
     * </pre>
     *
     * @param email      of the user and must be non null
     * @param password   of the user and must be non null
     * @param username   of the user
     * @param connection of the database to sign up with
     * @return a request to configure and start that will yield {@link Credentials}
     */
    signUp(email: string, password: string, username: string | undefined, connection: string): SignUpRequest;
    /**
     * Request a reset password using <a href="https://auth0.com/docs/api/authentication#change-password">'/dbconnections/change_password'</a>
     * Example usage:
     * <pre>
     * {@code
     * client.resetPassword("{email}", "{database connection name}")
     *      .start(new BaseCallback<Void>() {
     *          {@literal}Override
     *          public onSuccess(Void payload): void {}
     *
     *          {@literal}Override
     *          public onFailure(AuthenticationException error): void {}
     *      });
     * }
     * </pre>
     *
     * @param email      of the user to request the password reset. An email will be sent with the reset instructions.
     * @param connection of the database to request the reset password on
     * @return a request to configure and start
     */
    resetPassword(email: string, connection: string): DatabaseConnectionRequest<void, AuthenticationException>;
    /**
     * Request the revoke of a given refresh_token. Once revoked, the refresh_token cannot be used to obtain new tokens.
     * The client must be of type 'Native' or have the 'Token Endpoint Authentication Method' set to 'none' for this endpoint to work.
     * Example usage:
     * <pre>
     * {@code
     * client.revokeToken("{refresh_token}")
     *      .start(new BaseCallback<Void>() {
     *          {@literal}Override
     *          public onSuccess(Void payload): void {}
     *
     *          {@literal}Override
     *          public onFailure(AuthenticationException error): void {}
     *      });
     * }
     * </pre>
     *
     * @param refreshToken the token to revoke
     * @return a request to start
     */
    revokeToken(refreshToken: string): Request<void, AuthenticationException>;
    /**
     * Requests new Credentials using a valid Refresh Token. The received token will have the same audience and scope as first requested.
     * The endpoint will be /oauth/token with 'refresh_token' grant, and the response will include an id_token and an access_token if 'openid' scope was requested when the refresh_token was obtained.
     * Example usage:
     * <pre>
     * {@code
     * client.renewAuth("{refresh_token}")
     *      .addParameter("scope", "openid profile email")
     *      .start(new BaseCallback<Credentials>() {
     *          {@literal}Override
     *          public onSuccess(Credentials payload): void { }
     *
     *          {@literal}@Override
     *          public onFailure(AuthenticationException error): void { }
     *      });
     * }
     * </pre>
     *
     * @param refreshToken used to fetch the new Credentials.
     * @return a request to start
     */
    renewAuth(refreshToken: string): ParameterizableRequest<Credentials, AuthenticationException>;
    /**
     * Fetch the user's profile after it's authenticated by a login request.
     * If the login request fails, the returned request will fail
     *
     * @param authenticationRequest that will authenticate a user with Auth0 and return a {@link Credentials}
     * @return a {@link ProfileRequest} that first logins and the fetches the profile
     */
    getProfileAfter(authenticationRequest: AuthenticationRequest): ProfileRequest;
    /**
     * Fetch the token information from Auth0, using the authorization_code grant type
     * For Public Client, e.g. Android apps ,you need to provide the code_verifier
     * used to generate the challenge sent to Auth0 {@literal /authorize} method like:
     * <pre>
     * {@code
     * AuthenticationAPIClient client = new AuthenticationAPIClient(new Auth0("clientId", "domain"));
     * client
     *     .token("code", "redirect_uri")
     *     .setCodeVerifier("code_verifier")
     *     .start(new Callback<Credentials> {...});
     * }
     * </pre>
     * For the rest of clients, clients who can safely keep a {@literal client_secret}, you need to provide it instead like:
     * <pre>
     * {@code
     * AuthenticationAPIClient client = new AuthenticationAPIClient(new Auth0("clientId", "domain"));
     * client
     *     .token("code", "redirect_uri")
     *     .start(new Callback<Credentials> {...});
     * }
     * </pre>
     *
     * @param authorizationCode the authorization code received from the /authorize call.
     * @param redirectUri       the uri sent to /authorize as the 'redirect_uri'.
     * @return a request to obtain access_token by exchanging a authorization code.
     */
    token(authorizationCode: string, redirectUri: string): TokenRequest;
    private loginWithToken;
    private profileRequest;
}
