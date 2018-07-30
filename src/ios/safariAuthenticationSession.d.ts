import { AuthSession } from './authSession';
import { Credentials } from '../common/credentials';
import { Result } from './result';
import { Logger } from './logger';
import { OAuth2Grant } from './oauth2Grant';
export declare class SafariAuthenticationSession extends AuthSession {
    authSession: SFAuthenticationSession | undefined;
    readonly authorizeURL: NSURL;
    constructor(authorizeURL: NSURL, redirectURL: NSURL, state: string | undefined, handler: OAuth2Grant, finish: (result: Result<Credentials>) => void, logger: Logger | undefined);
}
