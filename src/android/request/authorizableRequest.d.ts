import { Auth0Exception } from '../auth0Exception';
import { ParameterizableRequest } from './parameterizableRequest';
export interface AuthorizableRequest<T, U extends Auth0Exception> extends ParameterizableRequest<T, U> {
    setBearer(jwt: string): AuthorizableRequest<T, U>;
}
