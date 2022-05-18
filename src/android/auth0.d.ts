import { Telemetry } from './util/telemetry';
/**
 * Represents your Auth0 account information (clientId {@literal &} domain),
 * and it's used to obtain clients for Auth0's APIs.
 * <pre>{@code
 * Auth0 auth0 = new Auth0("YOUR_CLIENT_ID", "YOUR_DOMAIN");
 * }</pre>
 * For more information, please see the <a href="https://auth0.com/docs/api-auth/tutorials/adoption">OIDC adoption guide</a>.
 *
 * @see Auth0#setOIDCConformant(boolean)
 */
export declare class Auth0 {
    private static readonly AUTH0_US_CDN_URL;
    private static readonly DOT_AUTH0_DOT_COM;
    private readonly clientId;
    private readonly domainUrl;
    private readonly configurationUrl;
    private telemetry;
    private loggingEnabled;
    private tls12Enforced;
    /**
     * Creates a new object using clientId, domain and configuration domain.
     *
     * @param clientId            of your Auth0 application
     * @param domain              of your Auth0 account
     * @param configurationDomain where Auth0's configuration will be fetched. By default is Auth0 public cloud
     */
    constructor(clientId: string, domain: string, configurationDomain?: string);
    /**
     * @return your Auth0 application client identifier
     */
    getClientId(): string;
    /**
     * @return your Auth0 account domain url
     */
    getDomainUrl(): string;
    /**
     * @return your account configuration url
     */
    getConfigurationUrl(): string;
    /**
     * @return Url to perform the web flow of OAuth
     */
    getAuthorizeUrl(): string;
    /**
     * @return Auth0 telemetry info sent in every request
     */
    getTelemetry(): Telemetry;
    /**
     * Setter for the Telemetry to send in every request to Auth0.
     *
     * @param telemetry to send in every request to Auth0
     */
    setTelemetry(telemetry: Telemetry): void;
    /**
     * Avoid sending telemetry in every request to Auth0
     */
    doNotSendTelemetry(): void;
    /**
     * Getter for the HTTP logger is enabled or not.
     *
     * @return whether every Request, Response and other sensitive information should be logged or not.
     */
    isLoggingEnabled(): boolean;
    /**
     * Log every Request, Response and other sensitive information exchanged using the Auth0 APIs.
     * You shouldn't enable logging in release builds as it may leak sensitive information.
     *
     * @param enabled if every Request, Response and other sensitive information should be logged.
     */
    setLoggingEnabled(enabled: boolean): void;
    /**
     * Getter for whether TLS 1.2 is enforced on devices with API 16-21.
     *
     * @return whether TLS 1.2 is enforced on devices with API 16-21.
     */
    isTLS12Enforced(): boolean;
    /**
     * Set whether to enforce TLS 1.2 on devices with API 16-21.
     *
     * @param enforced whether TLS 1.2 is enforced on devices with API 16-21.
     */
    setTLS12Enforced(enforced: boolean): void;
    private resolveConfiguration;
    private ensureValidUrl;
    private static getResourceFromContext;
}
