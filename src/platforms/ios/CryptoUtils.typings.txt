
declare const enum CompressionAlgorithm {

	ZLIB = 0,

	LZFSE = 1,

	LZMA = 2,

	LZ4 = 3
}

declare var CryptoUtilsVersionNumber: number;

declare var CryptoUtilsVersionString: interop.Reference<number>;

declare class DataCompression extends NSObject {

	static alloc(): DataCompression; // inherited from NSObject

	static new(): DataCompression; // inherited from NSObject

	constructor(o: { data: NSData; });

	adler32(): number;

	compressWithAlgo(algo: compression_algorithm): NSData;

	decompressWithAlgo(algo: compression_algorithm): NSData;

	deflate(): NSData;

	inflate(): NSData;

	initWithData(data: NSData): this;

	unzipWithSkipHeaderAndCheckSumValidation(skipHeaderAndCheckSumValidation: boolean): NSData;

	zip(): NSData;
}

declare class SwCC extends NSObject {

	static HMACAlgKey(data: NSData, alg: SwCC_HMACAlg, key: NSData): NSData;

	static alloc(): SwCC; // inherited from NSObject

	static available(): boolean;

	static cryptAuthBlockModeAlgorithmDataADataKeyIvTagLengthTagError(opMode: SwCC_OpMode, blockMode: SwCC_AuthBlockMode, algorithm: SwCC_Algorithm, data: NSData, aData: NSData, key: NSData, iv: NSData, tagLength: number, tag: NSData): NSDictionary<any, any>;

	static cryptBlockModeAlgorithmPaddingDataKeyIvError(opMode: SwCC_OpMode, blockMode: SwCC_BlockMode, algorithm: SwCC_Algorithm, padding: SwCC_Padding, data: NSData, key: NSData, iv: NSData): NSData;

	static cryptorAvailable(): boolean;

	static digestAlg(data: NSData, alg: SwCC_DigestAlgorithm): NSData;

	static digestAvailable(): boolean;

	static generateRandom(size: number): NSData;

	static hmacAvailable(): boolean;

	static new(): SwCC; // inherited from NSObject

	static randomAvailable(): boolean;
}

declare class SwCCM extends NSObject {

	static alloc(): SwCCM; // inherited from NSObject

	static available(): boolean;

	static cryptAlgorithmDataKeyIvADataTagLengthError(opMode: SwCC_OpMode, algorithm: SwCC_Algorithm, data: NSData, key: NSData, iv: NSData, aData: NSData, tagLength: number): NSDictionary<any, any>;

	static new(): SwCCM; // inherited from NSObject
}

declare const enum SwCC_Algorithm {

	Aes = 0,

	Des = 1,

	ThreeDES = 2,

	Cast = 3,

	Rc4 = 4,

	Rc2 = 5,

	Blowfish = 6
}

declare const enum SwCC_AuthBlockMode {

	Gcm = 11,

	Ccm = 12
}

declare const enum SwCC_BlockMode {

	Ecb = 1,

	Cbc = 2,

	Cfb = 3,

	Ctr = 4,

	F8 = 5,

	Lrw = 6,

	Ofb = 7,

	Xts = 8,

	Rc4 = 9,

	Cfb8 = 10
}

declare const enum SwCC_CCError {

	ParamError = -4300,

	BufferTooSmall = -4301,

	MemoryFailure = -4302,

	AlignmentError = -4303,

	DecodeError = -4304,

	Unimplemented = -4305,

	Overflow = -4306,

	RngFailure = -4307
}

declare const enum SwCC_DigestAlgorithm {

	None = 0,

	Md5 = 3,

	Rmd128 = 4,

	Rmd160 = 5,

	Rmd256 = 6,

	Rmd320 = 7,

	Sha1 = 8,

	Sha224 = 9,

	Sha256 = 10,

	Sha384 = 11,

	Sha512 = 12
}

declare const enum SwCC_HMACAlg {

	Sha1 = 0,

	Md5 = 1,

	Sha256 = 2,

	Sha384 = 3,

	Sha512 = 4,

	Sha224 = 5
}

declare const enum SwCC_OpMode {

	Encrypt = 0,

	Decrypt = 1
}

declare const enum SwCC_Padding {

	NoPadding = 0,

	Pkcs7Padding = 1
}

declare class SwCMAC extends NSObject {

	static AESCMACKey(data: NSData, key: NSData): NSData;

	static alloc(): SwCMAC; // inherited from NSObject

	static available(): boolean;

	static new(): SwCMAC; // inherited from NSObject
}

declare class SwCRC extends NSObject {

	static alloc(): SwCRC; // inherited from NSObject

	static available(): boolean;

	static new(): SwCRC; // inherited from NSObject
}

declare const enum SwCRC_Mode {

	Crc8 = 10,

	Crc8ICODE = 11,

	Crc8ITU = 12,

	Crc8ROHC = 13,

	Crc8WCDMA = 14,

	Crc16 = 20,

	Crc16CCITTTrue = 21,

	Crc16CCITTFalse = 22,

	Crc16USB = 23,

	Crc16XMODEM = 24,

	Crc16DECTR = 25,

	Crc16DECTX = 26,

	Crc16ICODE = 27,

	Crc16VERIFONE = 28,

	Crc16A = 29,

	Crc16B = 30,

	Crc16Fletcher = 31,

	Crc32Adler = 40,

	Crc32 = 41,

	Crc32CASTAGNOLI = 42,

	Crc32BZIP2 = 43,

	Crc32MPEG2 = 44,

	Crc32POSIX = 45,

	Crc32XFER = 46,

	Crc64ECMA182 = 60
}

declare class SwDH extends NSObject {

	static alloc(): SwDH; // inherited from NSObject

	static available(): boolean;

	static new(): SwDH; // inherited from NSObject
}

declare class SwDH_DH extends NSObject {

	static alloc(): SwDH_DH; // inherited from NSObject

	static new(): SwDH_DH; // inherited from NSObject

	constructor(o: { dhParam: SwDH_DHParam; });

	computeKeyError(peerKey: NSData): NSData;

	generateKeyAndReturnError(): NSData;

	initWithDhParamError(dhParam: SwDH_DHParam): this;
}

declare const enum SwDH_DHParam {

	Rfc3526Group5 = 0
}

declare class SwEC extends NSObject {

	static alloc(): SwEC; // inherited from NSObject

	static available(): boolean;

	static computeSharedSecretPublicKeyError(privateKey: NSData, publicKey: NSData): NSData;

	static generateKeyPairError(keySize: number): NSDictionary<any, any>;

	static new(): SwEC; // inherited from NSObject

	static signHashHashError(privateKey: NSData, hash: NSData): NSData;
}

declare class SwEC_generateKeyPairResult extends NSObject {

	static alloc(): SwEC_generateKeyPairResult; // inherited from NSObject

	static new(): SwEC_generateKeyPairResult; // inherited from NSObject

	privDERKey: NSData;

	pubDERKey: NSData;

	constructor(o: { privDERKey: NSData; pubDERKey: NSData; });

	initWithPrivDERKeyPubDERKey(privDERKey: NSData, pubDERKey: NSData): this;
}

declare class SwGCM extends NSObject {

	static alloc(): SwGCM; // inherited from NSObject

	static available(): boolean;

	static cryptAlgorithmDataKeyIvADataTagLengthError(opMode: SwCC_OpMode, algorithm: SwCC_Algorithm, data: NSData, key: NSData, iv: NSData, aData: NSData, tagLength: number): NSDictionary<any, any>;

	static new(): SwGCM; // inherited from NSObject
}

declare class SwGCM_CCM_cryptResult extends NSObject {

	static alloc(): SwGCM_CCM_cryptResult; // inherited from NSObject

	static new(): SwGCM_CCM_cryptResult; // inherited from NSObject

	result: NSData;

	tag: NSData;

	constructor(o: { result: NSData; tag: NSData; });

	initWithResultTag(result: NSData, tag: NSData): this;
}

declare class SwKeyConvert_PrivateKey extends NSObject {

	static alloc(): SwKeyConvert_PrivateKey; // inherited from NSObject

	static decryptPEMPassphraseError(pemKey: string, passphrase: string): string;

	static derToPKCS1PEM(derKey: NSData): string;

	static encryptPEMPassphraseModeError(pemKey: string, passphrase: string, mode: SwPEM_EncryptedPrivateKey_EncMode): string;

	static new(): SwKeyConvert_PrivateKey; // inherited from NSObject

	static pemToPKCS1DERError(pemKey: string): NSData;
}

declare class SwKeyConvert_PublicKey extends NSObject {

	static alloc(): SwKeyConvert_PublicKey; // inherited from NSObject

	static derToPKCS1PEM(derKey: NSData): string;

	static derToPKCS8PEM(derKey: NSData): string;

	static new(): SwKeyConvert_PublicKey; // inherited from NSObject

	static pemToPKCS1DERError(pemKey: string): NSData;
}

declare const enum SwKeyConvert_SecError {

	InvalidKey = 0,

	BadPassphrase = 1,

	KeyNotEncrypted = 2
}

declare class SwKeyDerivation extends NSObject {

	static PBKDF2SaltPrfRoundsError(password: string, salt: NSData, prf: SwKeyDerivation_PRFAlg, rounds: number): NSData;

	static alloc(): SwKeyDerivation; // inherited from NSObject

	static available(): boolean;

	static new(): SwKeyDerivation; // inherited from NSObject
}

declare const enum SwKeyDerivation_PRFAlg {

	Sha1 = 1,

	Sha224 = 2,

	Sha256 = 3,

	Sha384 = 4,

	Sha512 = 5
}

declare class SwKeyStore extends NSObject {

	static alloc(): SwKeyStore; // inherited from NSObject

	static delKeyError(keyTag: string): boolean;

	static getKeyError(keyTag: string): string;

	static new(): SwKeyStore; // inherited from NSObject

	static upsertKeyKeyTagOptionsError(pemKey: string, keyTag: string, options: NSDictionary<string, any>): boolean;
}

declare const enum SwKeyStore_SecError {

	Unimplemented = -4,

	Param = -50,

	Allocate = -108,

	NotAvailable = -25291,

	AuthFailed = -25293,

	DuplicateItem = -25299,

	ItemNotFound = -25300,

	InteractionNotAllowed = -25308,

	Decode = -26275,

	MissingEntitlement = -34018
}

declare class SwKeyWrap extends NSObject {

	static SymmetricKeyUnwrapKekWrappedKeyError(iv: NSData, kek: NSData, wrappedKey: NSData): NSData;

	static SymmetricKeyWrapKekRawKeyError(iv: NSData, kek: NSData, rawKey: NSData): NSData;

	static alloc(): SwKeyWrap; // inherited from NSObject

	static available(): boolean;

	static new(): SwKeyWrap; // inherited from NSObject

	static readonly rfc3394IV: NSData;
}

declare class SwPEM extends NSObject {

	static alloc(): SwPEM; // inherited from NSObject

	static new(): SwPEM; // inherited from NSObject
}

declare class SwPEM_EncryptedPrivateKey extends NSObject {

	static alloc(): SwPEM_EncryptedPrivateKey; // inherited from NSObject

	static new(): SwPEM_EncryptedPrivateKey; // inherited from NSObject

	static toDERPassphraseError(pemKey: string, passphrase: string): NSData;

	static toPEMPassphraseMode(derKey: NSData, passphrase: string, mode: SwPEM_EncryptedPrivateKey_EncMode): string;
}

declare const enum SwPEM_EncryptedPrivateKey_EncMode {

	Aes128CBC = 0,

	Aes256CBC = 1
}

declare class SwPEM_PrivateKey extends NSObject {

	static alloc(): SwPEM_PrivateKey; // inherited from NSObject

	static new(): SwPEM_PrivateKey; // inherited from NSObject

	static toDERError(pemKey: string): NSData;

	static toPEM(derKey: NSData): string;
}

declare class SwPEM_PublicKey extends NSObject {

	static alloc(): SwPEM_PublicKey; // inherited from NSObject

	static new(): SwPEM_PublicKey; // inherited from NSObject

	static toDERError(pemKey: string): NSData;

	static toPEM(derKey: NSData): string;
}

declare class SwPKCS8 extends NSObject {

	static alloc(): SwPKCS8; // inherited from NSObject

	static new(): SwPKCS8; // inherited from NSObject
}

declare class SwPKCS8_PrivateKey extends NSObject {

	static alloc(): SwPKCS8_PrivateKey; // inherited from NSObject

	static hasCorrectHeader(derKey: NSData): boolean;

	static new(): SwPKCS8_PrivateKey; // inherited from NSObject

	static stripHeaderIfAny(derKey: NSData): NSData;
}

declare class SwPKCS8_PublicKey extends NSObject {

	static addHeader(derKey: NSData): NSData;

	static alloc(): SwPKCS8_PublicKey; // inherited from NSObject

	static hasCorrectHeader(derKey: NSData): boolean;

	static new(): SwPKCS8_PublicKey; // inherited from NSObject

	static stripHeaderIfAny(derKey: NSData): NSData;
}

declare class SwRSA extends NSObject {

	static alloc(): SwRSA; // inherited from NSObject

	static available(): boolean;

	static decryptDerKeyTagPaddingDigestError(data: NSData, derKey: NSData, tag: NSData, padding: SwRSA_AsymmetricPadding, digest: SwCC_DigestAlgorithm): NSData;

	static encryptDerKeyTagPaddingDigestError(data: NSData, derKey: NSData, tag: NSData, padding: SwRSA_AsymmetricPadding, digest: SwCC_DigestAlgorithm): NSData;

	static generateKeyPairError(keySize: number): NSDictionary<any, any>;

	static new(): SwRSA; // inherited from NSObject

	static signDerKeyPaddingDigestSaltLenError(message: NSData, derKey: NSData, padding: SwRSA_AsymmetricSAPadding, digest: SwCC_DigestAlgorithm, saltLen: number): NSData;

	static verifyDerKeyPaddingDigestSaltLenSignedDataError(message: NSData, derKey: NSData, padding: SwRSA_AsymmetricSAPadding, digest: SwCC_DigestAlgorithm, saltLen: number, signedData: NSData): number;
}

declare const enum SwRSA_AsymmetricPadding {

	Pkcs1 = 1001,

	Oaep = 1002
}

declare const enum SwRSA_AsymmetricSAPadding {

	Pkcs15 = 1001,

	Pss = 1002
}

declare class SwRSA_generateKeyPairResult extends NSObject {

	static alloc(): SwRSA_generateKeyPairResult; // inherited from NSObject

	static new(): SwRSA_generateKeyPairResult; // inherited from NSObject

	privDERKey: NSData;

	pubDERKey: NSData;

	constructor(o: { privDERKey: NSData; pubDERKey: NSData; });

	initWithPrivDERKeyPubDERKey(privDERKey: NSData, pubDERKey: NSData): this;
}
