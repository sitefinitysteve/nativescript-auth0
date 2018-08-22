export declare class ParameterBuilder {
    static readonly GRANT_TYPE_REFRESH_TOKEN: string;
    static readonly GRANT_TYPE_PASSWORD: string;
    static readonly GRANT_TYPE_PASSWORD_REALM: string;
    static readonly GRANT_TYPE_AUTHORIZATION_CODE: string;
    static readonly GRANT_TYPE_MFA_OTP: string;
    static readonly SCOPE_OPENID: string;
    static readonly SCOPE_OFFLINE_ACCESS: string;
    static readonly ID_TOKEN_KEY: string;
    static readonly SCOPE_KEY: string;
    static readonly REFRESH_TOKEN_KEY: string;
    static readonly CONNECTION_KEY: string;
    static readonly REALM_KEY: string;
    static readonly ACCESS_TOKEN_KEY: string;
    static readonly CLIENT_ID_KEY: string;
    static readonly GRANT_TYPE_KEY: string;
    static readonly AUDIENCE_KEY: string;
    private parameters;
    constructor(parameters: {
        [key: string]: any;
    });
    setClientId(clientId: string): ParameterBuilder;
    setGrantType(grantType: string): ParameterBuilder;
    setConnection(connection: string): ParameterBuilder;
    setRealm(realm: string): ParameterBuilder;
    setScope(scope: string): ParameterBuilder;
    setAudience(audience: string): ParameterBuilder;
    setAccessToken(accessToken: string): ParameterBuilder;
    setRefreshToken(refreshToken: string): ParameterBuilder;
    setParameter(key: string, value: any): ParameterBuilder;
    addAll(parameters: {
        [key: string]: any;
    }): ParameterBuilder;
    clearAll(): ParameterBuilder;
    asDictionary(): {
        [key: string]: any;
    };
    static newAuthenticationBuilder(): ParameterBuilder;
    static newBuilder(parameters?: {
        [key: string]: any;
    }): ParameterBuilder;
}
