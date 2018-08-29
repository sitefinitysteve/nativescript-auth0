export declare class Credentials {
    readonly accessToken: string | undefined;
    readonly tokenType: string | undefined;
    readonly expiresIn: number | undefined;
    readonly expiresAt: Date | undefined;
    readonly refreshToken: string | undefined;
    readonly idToken: string | undefined;
    readonly scope: string | undefined;
    constructor(accessToken?: string | undefined, tokenType?: string | undefined, idToken?: string | undefined, refreshToken?: string | undefined, expiresIn?: number | undefined, expiresAt?: Date | undefined, scope?: string | undefined);
    static initWithJson(json: {
        [key: string]: any;
    }): Credentials;
    toJSON(): {
        access_token: string;
        token_type: string;
        id_token: string;
        refresh_token: string;
        expires_in: number;
        expires_at: Date;
        scope: string;
    };
}
