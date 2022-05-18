import { UserInfo } from '../../common/userInfo';
import { Credentials } from '../../common/credentials';
/**
 * The result of a successful authentication against Auth0
 * Contains the logged in user's {@link Credentials} and {@link UserProfile}.
 *
 * @see AuthenticationAPIClient#getProfileAfter(AuthenticationRequest)
 */
export declare class Authentication {
    private readonly profile;
    private readonly credentials;
    constructor(profile: UserInfo, credentials: Credentials);
    getProfile(): UserInfo;
    getCredentials(): Credentials;
}
