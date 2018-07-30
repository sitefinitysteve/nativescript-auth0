import { Auth0Exception } from '../auth0Exception';
export interface Callback<U extends Auth0Exception> {
    onFailure(error: U): any;
}
