import { HttpRequestOptions, HttpResponse, HttpContent } from '@nativescript/core/http';
import { Auth0Error } from './auth0Error';
export declare function json<T>(data: HttpContent | undefined): T | undefined;
export declare function string(data: HttpContent | undefined): string | undefined;
export declare class Response<E extends Auth0Error> {
    readonly data: HttpContent | undefined;
    readonly request: HttpRequestOptions | undefined;
    readonly response: HttpResponse | undefined;
    readonly error: Error | undefined;
    readonly EClass: typeof Auth0Error;
    constructor(data: HttpContent | undefined, request: HttpRequestOptions | undefined, response: HttpResponse | undefined, error: Error | undefined, EClass: typeof Auth0Error);
    result(): any | undefined;
}
