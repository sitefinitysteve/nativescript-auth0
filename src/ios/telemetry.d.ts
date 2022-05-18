import { HttpRequestOptions } from '@nativescript/core/http';
export declare class Telemetry {
    static readonly NameKey: string;
    static readonly VersionKey: string;
    static readonly WrappedVersion: string;
    static readonly NoVersion: string;
    static readonly LibraryName: string;
    enabled: boolean;
    info?: string;
    get value(): string | undefined;
    constructor();
    wrapped(name: string, version: string): void;
    addTelemetryHeader(request: HttpRequestOptions): void;
    queryItemsWithTelemetry(queryItems: NSURLQueryItem[]): NSURLQueryItem[];
    static versionInformation(): {
        [key: string]: string;
    };
    static generateValue(info?: {
        [key: string]: string;
    }): string | undefined;
}
export interface Trackable {
    telemetry: Telemetry;
}
export declare class TrackableExtension {
    /**
     Avoid Auth0.swift sending its version on every request to Auth0 API.
     By default we collect our libraries and SDKs versions to help us during support and evaluate usage.

     - parameter enabled: if Auth0.swift should send it's version on every request.
     */
    static tracking(trackable: Trackable, enabled: boolean): void;
    /**
     Send the library/framework, that has Auth0.swift as dependency, when sending telemetry information

     - parameter name:    name of library or framework that uses Auth0.swift
     - parameter version: version of library or framework
     */
    static using(trackable: Trackable, name: string, version: string): void;
}
