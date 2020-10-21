import { HttpRequestOptions, HttpResponse } from '@nativescript/core/http';
export interface Logger {
    trace(request: HttpRequestOptions): any;
    trace(response: HttpResponse): any;
    trace(url: NSURL, source: string): any;
}
export interface LoggerOutput {
    log(message: string): any;
    newLine(): any;
}
export declare class DefaultLogger implements Logger {
    readonly output: LoggerOutput;
    constructor(output?: LoggerOutput);
    trace(request: HttpRequestOptions): any;
    trace(response: HttpResponse): any;
    trace(url: NSURL, source: string | undefined): any;
    private traceRequest;
    private traceResponse;
    private traceUrl;
}
