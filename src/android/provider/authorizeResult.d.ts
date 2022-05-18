import Intent = android.content.Intent;
export declare class AuthorizeResult {
    private static readonly TAG;
    private static readonly MISSING_REQUEST_CODE;
    private readonly requestCode;
    private readonly resultCode;
    private readonly intent;
    /**
     * Wrapper for data received in OnActivityResult / OnNewIntent methods.
     *
     * @param requestCode the response request code
     * @param resultCode  the response result code
     * @param intent      the response intent.
     */
    constructor(requestCode: number, resultCode: number, intent?: Intent);
    /**
     * Wrapper for data received in OnActivityResult / OnNewIntent methods.
     *
     * @param intent the response intent.
     */
    constructor(intent?: Intent);
    /**
     * Checks if the received data is valid and can be parsed.
     *
     * @param expectedRequestCode the request code this activity is expecting to receive
     * @return whether if the received uri data can be parsed or not.
     */
    isValid(expectedRequestCode: number): boolean;
    getIntent(): Intent;
    getRequestCode(): number;
    getResultCode(): number;
}
