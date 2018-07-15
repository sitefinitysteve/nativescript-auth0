export declare class Credentials {
    private _accessToken?;
    readonly accessToken: string | undefined;
    private _tokenType?;
    readonly tokenType: string | undefined;
    private _expiresIn?;
    readonly expiresIn: number | undefined;
    private _expiresAt?;
    readonly expiresAt: Date | undefined;
    private _refreshToken?;
    readonly refreshToken: string | undefined;
    private _idToken?;
    readonly idToken: string | undefined;
    private _scope?;
    readonly scope: string | undefined;
    constructor(accessToken?: string | undefined, tokenType?: string | undefined, idToken?: string | undefined, refreshToken?: string | undefined, expiresIn?: number | undefined, expiresAt?: Date | undefined, scope?: string | undefined);
    static initWithJson(json: {
        [key: string]: any;
    }): Credentials;
    static initWithCoder(aDecoder: NSCoder): Credentials;
    encodeWithCoder(aCoder: NSCoder): void;
}
