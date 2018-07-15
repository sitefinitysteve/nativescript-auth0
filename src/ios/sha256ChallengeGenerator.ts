// tslint:disable-next-line:class-name
declare const CC_SHA256_CTX: any;
declare const CC_SHA256_DIGEST_LENGTH: number;

declare function CC_SHA256_Init(c: interop.Pointer | interop.Reference<any>): number;
declare function CC_SHA256_Update(c: interop.Pointer | interop.Reference<any>, data: interop.Pointer | interop.Reference<any>, len: number): number;
declare function CC_SHA256_Final(md: interop.Pointer | interop.Reference<any>, c: interop.Pointer | interop.Reference<any>): number;

const kVerifierSize: number = 32;

export class SHA256ChallengeGenerator {

    public readonly verifier: string;
    public readonly method: string;

    public static init(): SHA256ChallengeGenerator {
        const data = new NSMutableData({ length: kVerifierSize });
        const result = SecRandomCopyBytes(kSecRandomDefault, kVerifierSize, data.mutableBytes);
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
        const size = interop.sizeof(CC_SHA256_CTX);
        const ctxPtr = interop.alloc(size);

        const hashBytes = malloc(CC_SHA256_DIGEST_LENGTH);
        memset(hashBytes, 0x0, CC_SHA256_DIGEST_LENGTH);

        const valueData = new NSString({ string: this.verifier }).dataUsingEncoding(NSUTF8StringEncoding);

        CC_SHA256_Init(ctxPtr);
        CC_SHA256_Update(ctxPtr, valueData.bytes, valueData.length);
        CC_SHA256_Final(hashBytes, ctxPtr);

        const hash = new NSData({ bytes: hashBytes, length: CC_SHA256_DIGEST_LENGTH });

        if (hashBytes) {
            free(hashBytes);
        }

        return hash.base64EncodedStringWithOptions(0)
            .replace("+", "-")
            .replace("/", "_")
            .replace("=", '');
    }
}
