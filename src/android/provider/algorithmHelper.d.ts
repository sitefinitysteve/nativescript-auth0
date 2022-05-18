export declare class AlgorithmHelper {
    private static readonly TAG;
    private static readonly US_ASCII;
    private static readonly SHA_256;
    private getBase64String;
    getASCIIBytes(value: string): androidNative.Array<number>;
    getSHA256(input: androidNative.Array<number>): androidNative.Array<number>;
    generateCodeVerifier(): string;
    generateCodeChallenge(codeVerifier: string): string;
}
