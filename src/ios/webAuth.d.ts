import { Loggable } from './loggable';
import { Logger } from './logger';
import { ResponseType } from './responseType';
import { Trackable, Telemetry } from './telemetry';
import { Credentials } from './credentials';
import { Result } from './result';
export declare function resumeAuth(url: NSURL, options: NSDictionary<string, string>): boolean;
export declare abstract class WebAuth implements Trackable, Loggable {
    readonly abstract clientId: string;
    readonly abstract url: NSURL;
    abstract telemetry: Telemetry;
    abstract logger: Logger | undefined;
    abstract useUniversalLink(): this;
    abstract setConnection(connection: string): this;
    abstract setScope(scope: string): this;
    abstract setConnectionScope(connectionScope: string): this;
    abstract setState(state: string): this;
    abstract setParameters(parameters: {
        [param: string]: string;
    }): this;
    abstract setResponseType(response: ResponseType[]): this;
    abstract setNonce(nonce: String): this;
    abstract setAudience(audience: String): this;
    abstract usingImplicitGrant(): this;
    abstract useLegacyAuthentication(): this;
    abstract start(callback: (result: Result<Credentials>) => void): any;
    abstract clearSession(federated: boolean, callback: (success: boolean) => void): any;
}
