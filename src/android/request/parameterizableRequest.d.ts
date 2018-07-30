import { Auth0Exception } from '../auth0Exception';
import { Request } from './request';
export interface ParameterizableRequest<T, U extends Auth0Exception> extends Request<T, U> {
    addParameters(parameters: {
        [key: string]: any;
    }): ParameterizableRequest<T, U>;
    addParameter(name: string, value: any): ParameterizableRequest<T, U>;
    addHeader(name: string, value: string): ParameterizableRequest<T, U>;
}
