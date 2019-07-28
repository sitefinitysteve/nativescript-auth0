export declare class UserInfo {
    static readonly publicClaims: string[];
    readonly sub: string;
    readonly name: string | undefined;
    readonly givenName: string | undefined;
    readonly familyName: string | undefined;
    readonly middleName: string | undefined;
    readonly nickname: string | undefined;
    readonly preferredUsername: string | undefined;
    readonly profileURL: string | undefined;
    readonly pictureURL: string | undefined;
    readonly websiteURL: string | undefined;
    readonly email: string | undefined;
    readonly emailVerified: boolean | undefined;
    readonly gender: string | undefined;
    readonly birthdate: string | undefined;
    readonly zoneinfo: string | undefined;
    readonly locale: string | undefined;
    readonly phoneNumber: string | undefined;
    readonly phoneNumberVerified: boolean | undefined;
    readonly address: {
        [key: string]: string;
    } | undefined;
    readonly updatedAt: Date | undefined;
    readonly customClaims: {
        [key: string]: any;
    } | undefined;
    constructor(sub: string, name: string | undefined, givenName: string | undefined, familyName: string | undefined, middleName: string | undefined, nickname: string | undefined, preferredUsername: string | undefined, profileURL: string | undefined, pictureURL: string | undefined, websiteURL: string | undefined, email: string | undefined, emailVerified: boolean | undefined, gender: string | undefined, birthdate: string | undefined, zoneinfo: string | undefined, locale: string | undefined, phoneNumber: string | undefined, phoneNumberVerified: boolean | undefined, address: {
        [key: string]: string;
    } | undefined, updatedAt: Date | undefined, customClaims: {
        [key: string]: any;
    } | undefined);
    static initWithJson(json: {
        [key: string]: any;
    }): UserInfo | undefined;
    toJSON(): {
        sub: string;
        name: string;
        given_name: string;
        family_name: string;
        middle_name: string;
        nickname: string;
        preferred_username: string;
        profile: string;
        picture: string;
        website: string;
        email: string;
        email_verified: boolean;
        gender: string;
        birthdate: string;
        zoneinfo: string;
        locale: string;
        phone_number: string;
        phone_number_verified: boolean;
        address: {
            [key: string]: string;
        };
        updated_at: Date;
    };
}
