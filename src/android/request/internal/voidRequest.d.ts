import { HttpRequestOptions, HttpResponse } from '@nativescript/core/http';
import Uri = android.net.Uri;
import { BaseRequest } from './baseRequest';
import { Auth0Exception } from '../../auth0Exception';
import { ErrorBuilder } from '../errorBuilder';
export declare class VoidRequest<U extends Auth0Exception> extends BaseRequest<void, U> {
    private readonly httpMethod;
    constructor(url: Uri, httpMethod: string, errorBuilder: ErrorBuilder<U>);
    onResponse(response: HttpResponse): void;
    protected doBuildRequest(): HttpRequestOptions;
}
