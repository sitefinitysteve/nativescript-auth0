export declare class AlgorithmHelper {
    private static readonly TAG;
    private static readonly US_ASCII;
    private static readonly SHA_256;
    private getBase64String;
    getASCIIBytes(value: string): native.Array<number>;
    getSHA256(input: native.Array<number>): native.Array<number>;
    generateCodeVerifier(): string;
    generateCodeChallenge(codeVerifier: string): string;
}
