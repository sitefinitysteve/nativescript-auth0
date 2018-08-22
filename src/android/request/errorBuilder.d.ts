import { Auth0Exception } from '../auth0Exception';
export interface ErrorBuilder<U extends Auth0Exception> {
    from(message: string): U;
    from(message: string, exception: Auth0Exception): U;
    from(values: {
        [key: string]: any;
    }): U;
    from(payload: string, statusCode: number): U;
}
