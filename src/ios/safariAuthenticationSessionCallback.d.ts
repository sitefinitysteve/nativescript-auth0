import { AuthTransaction } from './authTransaction';
export declare class SafariAuthenticationSessionCallback implements AuthTransaction {
    state: string | undefined;
    authSession: SFAuthenticationSession | undefined;
    callback: (result: boolean) => void;
    constructor(url: NSURL, schemeURL: string, callback: (result: boolean) => void);
    resume(url: NSURL, options: {
        [key: string]: any;
    }): boolean;
    cancel(): void;
}
