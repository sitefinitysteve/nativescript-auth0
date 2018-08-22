import Uri = android.net.Uri;
export declare abstract class CallbackHelper {
    private static readonly TAG;
    static getCallbackUri(scheme: string, packageName: string, domain: string): string;
    static getValuesFromUri(uri: Uri): {
        [key: string]: string;
    };
    private static asMap;
}
