import { Authentication, DatabaseUser } from './authentication';
import { Telemetry } from './telemetry';
import { Logger } from './logger';
import { Credentials } from './credentials';
import { AuthenticationError } from './authenticationError';
import { Request } from './request';
import { UserInfo } from './userInfo';
import { WebAuth } from './webAuth';
export declare class Auth0Authentication extends Authentication {
    readonly clientId: string;
    readonly url: NSURL;
    telemetry: Telemetry;
    logger: Logger | undefined;
    constructor(clientId: string, url: NSURL, telemetry?: Telemetry);
    login(username: string, password: string, realm: string, audience: string | undefined, scope: string | undefined, parameters: {
        [key: string]: any;
    } | undefined): Request<Credentials, AuthenticationError>;
    loginWithOTP(otp: string, mfaToken: string): Request<Credentials, AuthenticationError>;
    createUser(email: string, username: string | undefined, password: string, connection: string, userMetadata?: {
        [key: string]: any;
    } | undefined): Request<DatabaseUser, AuthenticationError>;
    resetPassword(email: string, connection: string): Request<void, AuthenticationError>;
    userInfo(accessToken: string): Request<UserInfo, AuthenticationError>;
    tokenExchangeWithParameters(parameters: {
        [key: string]: any;
    }): Request<Credentials, AuthenticationError>;
    tokenExchangeWithCode(code: string, codeVerifier: string, redirectURI: string): Request<Credentials, AuthenticationError>;
    renew(refreshToken: string, scope?: string | undefined): Request<Credentials, AuthenticationError>;
    revoke(refreshToken: string): Request<void, AuthenticationError>;
    delegation(parameters: {
        [key: string]: any;
    }): Request<{
        [key: string]: any;
    }, AuthenticationError>;
    webAuth(connection: string): WebAuth;
}
