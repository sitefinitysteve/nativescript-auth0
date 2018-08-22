import { UserInfo } from '../../common/userInfo';
import { Credentials } from '../../common/credentials';
export declare class Authentication {
    private readonly profile;
    private readonly credentials;
    constructor(profile: UserInfo, credentials: Credentials);
    getProfile(): UserInfo;
    getCredentials(): Credentials;
}
