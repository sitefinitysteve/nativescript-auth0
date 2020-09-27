import { HttpRequestOptions, HttpResponse } from '@nativescript/core/http';
import Uri = android.net.Uri;
import { Auth0Exception } from '../../auth0Exception';
import { ParameterBuilder } from '../../authentication/parameterBuilder';
import { ParameterizableRequest } from '../parameterizableRequest';
import { AuthorizableRequest } from '../authorizableRequest';
import { BaseCallback } from '../../callback/baseCallback';
import { ErrorBuilder } from '../errorBuilder';
import { JSONObjectPayload } from '../../../common/jsonObjectPayload';
export declare abstract class BaseRequest<T, U extends Auth0Exception> implements ParameterizableRequest<T, U>, AuthorizableRequest<T, U> {
    private readonly headers;
    protected readonly url: Uri;
    private readonly adapter;
    private readonly errorBuilder;
    private readonly builder;
    private callback;
    constructor(url: Uri, adapter: JSONObjectPayload<T>, errorBuilder: ErrorBuilder<U>, headers?: {
        [key: string]: string;
    }, parameterBuilder?: ParameterBuilder);
    protected setCallback(callback: BaseCallback<T, U>): void;
    protected postOnSuccess(payload: T): void;
    protected postOnFailure(error: U): void;
    protected newRequestOptions(method: string): HttpRequestOptions;
    protected getAdapter(): JSONObjectPayload<T>;
    protected getErrorBuilder(): ErrorBuilder<U>;
    getCallback(): BaseCallback<T, U>;
    protected buildBody(): string;
    protected parseUnsuccessfulResponse(response: HttpResponse): U;
    onFailure(request: HttpRequestOptions, e: Error): void;
    addHeader(name: string, value: string): ParameterizableRequest<T, U>;
    setBearer(jwt: string): AuthorizableRequest<T, U>;
    addParameters(parameters: {
        [key: string]: any;
    }): ParameterizableRequest<T, U>;
    addParameter(name: string, value: any): ParameterizableRequest<T, U>;
    start(callback: BaseCallback<T, U>): void;
    protected abstract doBuildRequest(): HttpRequestOptions;
    abstract onResponse(response: HttpResponse): void;
}
