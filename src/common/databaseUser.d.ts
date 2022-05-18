/**
 * Auth0 user created in a Database connection.
 *
 * @see AuthenticationAPIClient#signUp(String, String, String)
 */
export declare class DatabaseUser {
    readonly email: string | undefined;
    readonly username: string | undefined;
    readonly emailVerified: boolean | undefined;
    constructor(email?: string | undefined, username?: string | undefined, emailVerified?: boolean | undefined);
    static initWithJson(json: {
        [key: string]: any;
    }): DatabaseUser;
    toJSON(): {
        email: string;
        username: string;
        email_verified: boolean;
    };
}
