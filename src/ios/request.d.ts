import { HttpRequestOptions } from '@nativescript/core/http';
import { Auth0Error } from './auth0Error';
import { Requestable } from './requestable';
import { Response } from './response';
import { Result } from './result';
import { Logger } from './logger';
import { Telemetry } from './telemetry';
/**
 Auth0 API request

 ```
 let request: Request<Credentials, Authentication.Error> = //
 request.start { result in
    //handle result
 }
 ```
 */
export declare class Request<T, E extends Auth0Error> implements Requestable<T> {
    readonly url: NSURL;
    readonly method: string;
    readonly handle: (response: Response<E>, callback: (result: Result<T>) => void) => void;
    readonly payload: {
        [key: string]: any;
    };
    readonly headers: {
        [key: string]: string;
    };
    readonly logger: Logger | undefined;
    readonly telemetry: Telemetry | undefined;
    readonly EClass: typeof Auth0Error;
    constructor(url: NSURL, method: string, handle: (response: Response<E>, callback: (result: Result<T>) => void) => void, payload: {
        [key: string]: any;
    }, headers: {
        [key: string]: string;
    }, logger: Logger | undefined, telemetry: Telemetry, EClass: typeof Auth0Error);
    get request(): HttpRequestOptions;
    /**
     Starts the request to the server

     - parameter callback: called when the request finishes and yield it's result
     */
    start(callback: (result: Result<T>) => void): void;
}
/**
 *  A concatenated request, if the first one fails it will yield it's error, otherwise it will return the last request outcome
 */
export declare class ConcatRequest<F, S, E extends Auth0Error> implements Requestable<S> {
    readonly first: Request<F, E>;
    readonly second: Request<S, E>;
    /**
     Starts the request to the server

     - parameter callback: called when the request finishes and yield it's result
     */
    start(callback: (result: Result<S>) => void): void;
}
