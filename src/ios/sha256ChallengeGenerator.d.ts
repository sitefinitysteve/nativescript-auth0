export declare class SHA256ChallengeGenerator {
    readonly verifier: string;
    readonly method: string;
    static init(): SHA256ChallengeGenerator;
    constructor(verifier: NSData);
    readonly challenge: string;
}
