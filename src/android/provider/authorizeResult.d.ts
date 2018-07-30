import Intent = android.content.Intent;
export declare class AuthorizeResult {
    private static readonly TAG;
    private static readonly MISSING_REQUEST_CODE;
    private readonly requestCode;
    private readonly resultCode;
    private readonly intent;
    constructor(requestCode: number, resultCode: number, intent?: Intent);
    constructor(intent?: Intent);
    isValid(expectedRequestCode: number): boolean;
    getIntent(): Intent;
    getRequestCode(): number;
    getResultCode(): number;
}
