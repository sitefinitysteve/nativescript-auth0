import { JSONObjectPayload } from './jsonObjectPayload';
export { JSONObjectPayload } from './jsonObjectPayload';

/**
 User's credentials obtained from Auth0.
 What values are available depends on what type of Auth request you perfomed,
 so if you used WebAuth (`/authorize` call) the `response_type` and `scope` will determine what tokens you get
 */
export class Credentials extends NSObject implements JSONObjectPayload, NSSecureCoding {

    /// Token used that allows calling to the requested APIs (audience sent on Auth)
    private _accessToken?: string;
    public get accessToken(): string | undefined {
        return this._accessToken;
    }
    /// Type of the access token
    private _tokenType?: string;
    public get tokenType(): string | undefined {
        return this._tokenType;
    }
    /// The token lifetime in seconds
    private _expiresIn?: number;
    public get expiresIn(): number | undefined {
        return this._expiresIn;
    }
    /// The token expiration date
    private _expiresAt?: Date;
    public get expiresAt(): Date | undefined {
        return this._expiresAt;
    }
    /// If the API allows you to request new access tokens and the scope `offline_access` was included on Auth
    private _refreshToken?: string;
    public get refreshToken(): string | undefined {
        return this._refreshToken;
    }

    // Token that details the user identity after authentication
    private _idToken?: string;
    public get idToken(): string | undefined {
        return this._refreshToken;
    }
    // Granted scopes, only populated when a requested scope or scopes was not granted and Auth is OIDC Conformant
    private _scope?: string;
    public get scope(): string | undefined {
        return this._scope;
    }

    public initWithAccessTokenTokenTypeIdTokenRefreshTokenExpiresInScope(
        accessToken: string | undefined = null,
        tokenType: string | undefined = null,
        idToken: string | undefined = null,
        refreshToken: string | undefined = null,
        expiresIn: number | undefined = null,
        expiresAt: Date | undefined = null,
        scope: string | undefined = null
    ): this {
        this._accessToken = accessToken;
        this._tokenType = tokenType;
        this._idToken = idToken;
        this._refreshToken = refreshToken;
        this._expiresIn = expiresIn;
        this._expiresAt = expiresAt;
        this._scope = scope;

        if (expiresAt == null && expiresIn != null) {
            this._expiresAt = new Date(Date.now() + expiresIn * 1000);
        }
        if (expiresIn == null && expiresAt != null) {
            this._expiresIn = (expiresAt.getTime() - Date.now()) / 1000;
        }

        return this;
    }

    public initWithJson(json: { [key: string]: any }): this {
        const accessToken = json["accessToken"];
        const tokenType = json["tokenType"];
        const idToken = json["idToken"];
        const refreshToken = json["refreshToken"];
        const expiresIn = json["expiresIn"];
        const scope = json["scope"];
        return this.initWithAccessTokenTokenTypeIdTokenRefreshTokenExpiresInScope(
            (accessToken != null) ? String(accessToken) : undefined,
            (tokenType != null) ? String(tokenType) : undefined,
            (idToken != null) ? String(idToken) : undefined,
            (refreshToken != null) ? String(refreshToken) : undefined,
            (expiresIn != null) ? Number(expiresIn) : undefined,
            undefined,
            (scope != null) ? String(scope) : undefined
        );
    }

    // MARK: - NSSecureCoding

    public initWithCoder(aDecoder: NSCoder): this {
        const accessToken = aDecoder.decodeObjectForKey("accessToken");
        const tokenType = aDecoder.decodeObjectForKey("tokenType");
        const idToken = aDecoder.decodeObjectForKey("idToken");
        const refreshToken = aDecoder.decodeObjectForKey("refreshToken");
        const expiresIn = aDecoder.decodeObjectForKey("expiresIn");
        const expiresAt = aDecoder.decodeObjectForKey("expiresAt");
        const scope = aDecoder.decodeObjectForKey("scope");

        return this.initWithAccessTokenTokenTypeIdTokenRefreshTokenExpiresInScope(
            (accessToken != null) ? String(accessToken) : undefined,
            (tokenType != null) ? String(tokenType) : undefined,
            (idToken != null) ? String(idToken) : undefined,
            (refreshToken != null) ? String(refreshToken) : undefined,
            (expiresIn != null) ? Number(expiresIn) : undefined,
            (expiresAt != null) ? new Date(expiresAt) : undefined,
            (scope != null) ? String(scope) : undefined
        );
    }

    public encodeWithCoder(aCoder: NSCoder): void {
        aCoder.encodeObjectForKey(this._accessToken, "accessToken");
        aCoder.encodeObjectForKey(this._tokenType, "tokenType");
        aCoder.encodeObjectForKey(this._idToken, "idToken");
        aCoder.encodeObjectForKey(this._refreshToken, "refreshToken");
        aCoder.encodeObjectForKey(this._expiresIn, "expiresIn");
        aCoder.encodeObjectForKey((this._expiresAt != null) ? this._expiresAt.getTime() : undefined, "expiresAt");
        aCoder.encodeObjectForKey(this._scope, "scope");
    }

    public static supportsSecureCoding: boolean = true;

    // An array of protocols to be implemented by the native class
    public static ObjCProtocols = [ NSSecureCoding ];

    // A selector will be exposed so it can be called from native.
    public static ObjCExposedMethods = {
        "initWithCoder": { returns: Credentials, params: [ NSCoder ] },
        "encodeWithCoder": { returns: interop.types.void, params: [ NSCoder ] }
    };
}