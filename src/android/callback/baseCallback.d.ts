import { Auth0Exception } from '../auth0Exception';
import { Callback } from './callback';
export interface BaseCallback<T, U extends Auth0Exception> extends Callback<U> {
    onSuccess(payload: T): any;
}
