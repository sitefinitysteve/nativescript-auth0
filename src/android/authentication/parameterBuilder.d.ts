/**
 * Builder for Auth0 Authentication API parameters
 * You can build your parameters like this
 * <pre>
 * {@code
 * parameters: { [key: string]: any } = ParameterBuilder.newBuilder()
 *      .setClientId("{CLIENT_ID}")
 *      .setConnection("{CONNECTION}")
 *      .set("{PARAMETER_NAME}", "{PARAMETER_VALUE}")
 *      .asDictionary();
 * }
 * </pre>
 *
 * @see ParameterBuilder#newBuilder()
 * @see ParameterBuilder#newAuthenticationBuilder()
 */
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
    /**
     * Sets the 'client_id' parameter
     *
     * @param clientId the application's client id
     * @return itself
     */
    setClientId(clientId: string): ParameterBuilder;
    /**
     * Sets the 'grant_type' parameter
     *
     * @param grantType grant type
     * @return itself
     */
    setGrantType(grantType: string): ParameterBuilder;
    /**
     * Sets the 'connection' parameter
     *
     * @param connection name of the connection
     * @return itself
     */
    setConnection(connection: string): ParameterBuilder;
    /**
     * Sets the 'realm' parameter. A realm identifies the host against which the authentication will be made, and usually helps to know which username and password to use.
     *
     * @param realm name of the realm
     * @return itself
     */
    setRealm(realm: string): ParameterBuilder;
    /**
     * Sets the 'scope' parameter.
     *
     * @param scope a scope value
     * @return itself
     */
    setScope(scope: string): ParameterBuilder;
    /**
     * Sets the 'audience' parameter.
     *
     * @param audience an audience value
     * @return itself
     */
    setAudience(audience: string): ParameterBuilder;
    /**
     * Sets the 'access_token' parameter
     *
     * @param accessToken a access token
     * @return itself
     */
    setAccessToken(accessToken: string): ParameterBuilder;
    /**
     * Sets the 'refresh_token' parameter
     *
     * @param refreshToken a access token
     * @return itself
     */
    setRefreshToken(refreshToken: string): ParameterBuilder;
    /**
     * Sets a parameter
     *
     * @param key   parameter name
     * @param value parameter value. A null value will remove the key if present.
     * @return itself
     */
    setParameter(key: string, value: any): ParameterBuilder;
    /**
     * Adds all parameter from a map
     *
     * @param parameters map with parameters to add. Null values will be skipped.
     * @return itself
     */
    addAll(parameters: {
        [key: string]: any;
    }): ParameterBuilder;
    /**
     * Clears all existing parameters
     *
     * @return itself
     */
    clearAll(): ParameterBuilder;
    /**
     * Create a {@link Map} with all the parameters
     *
     * @return all parameters added previously as a {@link Map}
     */
    asDictionary(): {
        [key: string]: any;
    };
    /**
     * Creates a new instance of the builder using default values for login request, e.g. 'openid' for scope.
     *
     * @return a new builder
     */
    static newAuthenticationBuilder(): ParameterBuilder;
    /**
     * Creates a new instance of the builder.
     * This builder may have some initial parameters.
     *
     * @param parameters initial parameters
     * @return a new builder
     */
    static newBuilder(parameters?: {
        [key: string]: any;
    }): ParameterBuilder;
}
