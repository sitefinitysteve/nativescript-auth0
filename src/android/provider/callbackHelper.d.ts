import Uri = android.net.Uri;
export declare abstract class CallbackHelper {
    private static readonly TAG;
    /**
     * Generates the callback Uri for the given domain.
     *
     * @return the callback Uri.
     */
    static getCallbackUri(scheme: string, packageName: string, domain: string): string;
    static getValuesFromUri(uri: Uri): {
        [key: string]: string;
    };
    private static asMap;
}
