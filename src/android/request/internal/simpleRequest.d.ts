import { HttpRequestOptions, HttpResponse } from '@nativescript/core/http';
import Uri = android.net.Uri;
import { BaseRequest } from './baseRequest';
import { Auth0Exception } from '../../auth0Exception';
import { ErrorBuilder } from '../errorBuilder';
import { ParameterizableRequest } from '../parameterizableRequest';
import { JSONObjectPayload } from '../../../common/jsonObjectPayload';
export declare class SimpleRequest<T, U extends Auth0Exception> extends BaseRequest<T, U> implements ParameterizableRequest<T, U> {
    private readonly method;
    constructor(url: Uri, httpMethod: string, clazz: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>);
    constructor(url: Uri, httpMethod: string, errorBuilder: ErrorBuilder<U>);
    onResponse(response: HttpResponse): void;
    protected doBuildRequest(): HttpRequestOptions;
}
