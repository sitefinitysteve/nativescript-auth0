export declare function jsArrayToNSArray<T>(arr: T[]): NSArray<T>;
export declare function nsArrayToJSArray<T>(a: NSArray<T>): Array<T>;
export declare function a0_encodeBase64URLSafe(dataOrString: NSData | string): string;
export declare function a0_url(domain: string): NSURL;
export declare function a0_fragmentValues(components: NSURLComponents): {
    [key: string]: string;
};
export declare function a0_queryValues(components: NSURLComponents): {
    [key: string]: string;
};
export declare const invokeOnRunLoop: (func: any) => void;
