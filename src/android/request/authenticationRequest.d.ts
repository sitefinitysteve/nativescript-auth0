import { Credentials } from '../../common/credentials';
import { AuthenticationException } from '../authentication/authenticationException';
import { Request } from './request';
export interface AuthenticationRequest extends Request<Credentials, AuthenticationException> {
    setGrantType(grantType: string): AuthenticationRequest;
    setRealm(realm: string): AuthenticationRequest;
    setScope(scope: string): AuthenticationRequest;
    setAudience(audience: string): AuthenticationRequest;
    setAccessToken(accessToken: string): AuthenticationRequest;
    addAuthenticationParameters(parameters: {
        [key: string]: any;
    }): AuthenticationRequest;
}
