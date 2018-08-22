export declare class DatabaseUser {
    readonly email: string | undefined;
    readonly username: string | undefined;
    readonly emailVerified: boolean | undefined;
    constructor(email?: string | undefined, username?: string | undefined, emailVerified?: boolean | undefined);
    static initWithJson(json: {
        [key: string]: any;
    }): DatabaseUser;
}
