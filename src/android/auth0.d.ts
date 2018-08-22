import { Telemetry } from './util/telemetry';
export declare class Auth0 {
    private static readonly AUTH0_US_CDN_URL;
    private static readonly DOT_AUTH0_DOT_COM;
    private readonly clientId;
    private readonly domainUrl;
    private readonly configurationUrl;
    private telemetry;
    private loggingEnabled;
    private tls12Enforced;
    constructor(clientId: string, domain: string, configurationDomain?: string);
    getClientId(): string;
    getDomainUrl(): string;
    getConfigurationUrl(): string;
    getAuthorizeUrl(): string;
    getTelemetry(): Telemetry;
    setTelemetry(telemetry: Telemetry): void;
    doNotSendTelemetry(): void;
    isLoggingEnabled(): boolean;
    setLoggingEnabled(enabled: boolean): void;
    isTLS12Enforced(): boolean;
    setTLS12Enforced(enforced: boolean): void;
    private resolveConfiguration;
    private ensureValidUrl;
    private static getResourceFromContext;
}
