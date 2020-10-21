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
    static tracking(trackable: Trackable, enabled: boolean): void;
    static using(trackable: Trackable, name: string, version: string): void;
}
