import { ControllerModalPresenter } from './controllerModalPresenter';
import { Credentials } from '../common/credentials';
import { Logger } from './logger';
import { ResponseType } from './responseType';
import { Telemetry } from './telemetry';
import { TransactionStore } from './transactionStore';
import { WebAuth } from './webAuth';
import { Result } from './result';
import { OAuth2Grant } from './oauth2Grant';
export declare class SafariWebAuth extends WebAuth {
    static NoBundleIdentifier: string;
    readonly clientId: string;
    readonly url: NSURL;
    telemetry: Telemetry;
    readonly presenter: ControllerModalPresenter;
    readonly storage: TransactionStore;
    logger: Logger | undefined;
    parameters: {
        [param: string]: string;
    };
    universalLink: boolean;
    responseType: ResponseType[];
    nonce: string | undefined;
    private authenticationSession;
    static init(clientId: string, url: NSURL, presenter?: ControllerModalPresenter, telemetry?: Telemetry): SafariWebAuth;
    constructor(clientId: string, url: NSURL, presenter: ControllerModalPresenter, storage: TransactionStore, telemetry: Telemetry);
    useUniversalLink(): this;
    setConnection(connection: string): this;
    setScope(scope: string): this;
    setConnectionScope(connectionScope: string): this;
    setState(state: string): this;
    setParameters(parameters: {
        [param: string]: string;
    }): this;
    setResponseType(responseType: ResponseType[]): this;
    setNonce(nonce: string): this;
    usingImplicitGrant(): this;
    setAudience(audience: string): this;
    useLegacyAuthentication(): this;
    start(callback: (result: Result<Credentials>) => void): void;
    newSafari(authorizeURL: NSURL, callback: (result: Result<Credentials>) => void): {
        controller: SFSafariViewController;
        finish: (result: Result<Credentials>) => void;
    };
    buildAuthorizeURL(redirectURL: NSURL, defaults: {
        [key: string]: string;
    }, state: string | undefined): NSURL;
    handler(redirectURL: NSURL): OAuth2Grant;
    get redirectURL(): NSURL | undefined;
    clearSession(federated: boolean, callback: (success: boolean) => void): void;
}
