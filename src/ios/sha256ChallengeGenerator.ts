const kVerifierSize: number = 32;

export class SHA256ChallengeGenerator {

    public readonly verifier: string;
    public readonly method: string;

    public static init(): SHA256ChallengeGenerator {
        const data = SwCC.generateRandom(kVerifierSize);
        return new SHA256ChallengeGenerator(data);
    }

    constructor(verifier: NSData) {
        this.verifier = verifier.base64EncodedStringWithOptions(0)
            .replace("+", "-")
            .replace("/", "_")
            .replace("=", '');
        this.method = "S256";
    }

    public get challenge(): string {
        const valueData = new NSString({ string: this.verifier }).dataUsingEncoding(NSUTF8StringEncoding);
        const hash = SwCC.digestAlg(valueData, SwCC_DigestAlgorithm.Sha256);

        return hash.base64EncodedStringWithOptions(0)
            .replace("+", "-")
            .replace("/", "_")
            .replace("=", '');
    }
}
