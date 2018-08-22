import { Auth0Exception } from '../auth0Exception';
import { BaseCallback } from '../callback/baseCallback';
export interface Request<T, U extends Auth0Exception> {
    start(callback: BaseCallback<T, U>): any;
}
