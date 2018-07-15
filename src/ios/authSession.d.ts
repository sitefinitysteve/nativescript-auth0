import { AuthTransaction } from './authTransaction';
import { Credentials } from './credentials';
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
    resume(url: NSURL, options?: NSDictionary<string, any>): boolean;
    cancel(): void;
    private has(state, items);
}
