import { OAuth2Grant } from './oauth2Grant';
import { AuthSession } from './authSession';
import { Result } from './result';
import { Credentials } from '../common/credentials';
import { Logger } from './logger';
export declare class SafariSessionDelegate extends NSObject {
    static ObjCProtocols: {
        prototype: SFSafariViewControllerDelegate;
    }[];
    private _owner;
    static initWithOwner(owner: WeakRef<SafariSession>): SafariSessionDelegate;
    safariViewControllerDidFinish(controller: SFSafariViewController): void;
}
export declare class SafariSession extends AuthSession {
    controller: WeakRef<UIViewController>;
    private _delegate;
    constructor(controller: SFSafariViewController, redirectURL: NSURL, state: string | undefined, handler: OAuth2Grant, finish: (result: Result<Credentials>) => void, logger: Logger | undefined);
}
