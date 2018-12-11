import { Credentials } from '../common/credentials';
import { ResponseType } from './responseType';
import { Result } from './result';
import { Authentication } from './authentication';
export interface OAuth2Grant {
    defaults: {
        [key: string]: string;
    };
    credentials(values: {
        [key: string]: string;
    }, callback: (success: Result<Credentials>) => void): any;
    values(components: NSURLComponents): {
        [key: string]: string;
    };
}
export declare class ImplicitGrant implements OAuth2Grant {
    readonly defaults: {
        [key: string]: string;
    };
    readonly responseType: ResponseType[];
    constructor(responseType?: ResponseType[], nonce?: string | undefined);
    credentials(values: {
        [key: string]: string;
    }, callback: (success: Result<Credentials>) => void): void;
    values(components: NSURLComponents): {
        [key: string]: string;
    };
}
export declare class PKCE implements OAuth2Grant {
    readonly authentication: Authentication;
    readonly redirectURL: NSURL;
    readonly defaults: {
        [key: string]: string;
    };
    readonly verifier: string;
    readonly responseType: ResponseType[];
    static init(authentication: Authentication, redirectURL: NSURL, reponseType?: ResponseType[], nonce?: string | undefined, generator?: A0SHA256ChallengeGenerator): PKCE;
    constructor(authentication: Authentication, redirectURL: NSURL, verifier: string, challenge: string, method: string, responseType: ResponseType[], nonce?: string | undefined);
    credentials(values: {
        [key: string]: string;
    }, callback: (result: Result<Credentials>) => void): void;
    values(components: NSURLComponents): {
        [key: string]: string;
    };
}
