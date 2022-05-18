import { AuthTransaction } from './authTransaction';
import { Credentials } from '../common/credentials';
import { Logger } from './logger';
import { Result } from './result';
import { OAuth2Grant } from './oauth2Grant';
export declare class AuthSession implements AuthTransaction {
    readonly redirectURL: NSURL;
    readonly state: string | undefined;
    readonly finish: (result: Result<Credentials>) => void;
    readonly handler: OAuth2Grant;
    readonly logger: Logger | undefined;
    constructor(redirectURL: NSURL, state: string | undefined, handler: OAuth2Grant, finish: (result: Result<Credentials>) => void, logger: Logger | undefined);
    /**
     Tries to resume (and complete) the OAuth2 session from the received URL

     - parameter url:     url received in application's AppDelegate
     - parameter options: a dictionary of launch options received from application's AppDelegate

     - returns: `true` if the url completed (successfuly or not) this session, `false` otherwise
     */
    resume(url: NSURL, options?: NSDictionary<string, any>): boolean;
    cancel(): void;
    private has;
}
