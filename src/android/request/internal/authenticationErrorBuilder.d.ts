import { ErrorBuilder } from '../errorBuilder';
import { AuthenticationException } from '../../authentication/authenticationException';
import { Auth0Exception } from '../../auth0Exception';
export declare class AuthenticationErrorBuilder implements ErrorBuilder<AuthenticationException> {
    from(message: string): AuthenticationException;
    from(message: string, exception: Auth0Exception): AuthenticationException;
    from(values: {
        [key: string]: any;
    }): AuthenticationException;
    from(payload: string, statusCode: number): AuthenticationException;
}
