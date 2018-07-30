import { Loggable } from './loggable';
import { Trackable, Telemetry } from './telemetry';
import { Credentials } from '../common/credentials';
import { Request } from './request';
import { AuthenticationError } from './authenticationError';
import { UserInfo } from '../common/userInfo';
import { WebAuth } from './webAuth';
import { Logger } from './logger';
import { DatabaseUser } from '../common/databaseUser';
export declare abstract class Authentication implements Trackable, Loggable {
    readonly abstract clientId: string;
    readonly abstract url: NSURL;
    readonly abstract telemetry: Telemetry;
    readonly abstract logger: Logger | undefined;
    abstract login(username: string, password: string, realm: string, audience?: string | undefined, scope?: string | undefined, parameters?: {
        [param: string]: any;
    } | undefined): Request<Credentials, AuthenticationError>;
    abstract loginWithOTP(otp: string, mfaToken: string): Request<Credentials, AuthenticationError>;
    abstract createUser(email: string, username: string | undefined, password: string, connection: string, userMetadata?: {
        [key: string]: any;
    } | undefined): Request<DatabaseUser, AuthenticationError>;
    abstract resetPassword(email: string, connection: string): Request<void, AuthenticationError>;
    abstract userInfo(accessToken: string): Request<UserInfo, AuthenticationError>;
    abstract tokenExchangeWithParameters(parameters: {
        [key: string]: any;
    }): Request<Credentials, AuthenticationError>;
    abstract tokenExchangeWithCode(code: string, codeVerifier: string, redirectURI: string): Request<Credentials, AuthenticationError>;
    abstract renew(refreshToken: string, scope?: string | undefined): Request<Credentials, AuthenticationError>;
    abstract revoke(refreshToken: string): Request<void, AuthenticationError>;
    abstract webAuth(connection: string): WebAuth;
}
