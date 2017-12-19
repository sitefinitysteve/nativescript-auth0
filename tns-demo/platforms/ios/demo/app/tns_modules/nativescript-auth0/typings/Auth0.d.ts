
declare class A0AuthenticationAPI extends NSObject {

	static alloc(): A0AuthenticationAPI; // inherited from NSObject

	static new(): A0AuthenticationAPI; // inherited from NSObject

	constructor(o: { clientId: string; url: NSURL; });

	constructor(o: { clientId: string; url: NSURL; session: NSURLSession; });

	createUserWithEmailUsernamePasswordConnectionUserMetadataCallback(email: string, username: string, password: string, connection: string, userMetadata: NSDictionary<string, any>, callback: (p1: NSError, p2: NSDictionary<string, any>) => void): void;

	initWithClientIdUrl(clientId: string, url: NSURL): this;

	initWithClientIdUrlSession(clientId: string, url: NSURL, session: NSURLSession): this;

	loginSocialWithTokenConnectionScopeParametersCallback(token: string, connection: string, scope: string, parameters: NSDictionary<string, any>, callback: (p1: NSError, p2: A0Credentials) => void): void;

	loginWithUsernameOrEmailPasswordConnectionScopeParametersCallback(username: string, password: string, connection: string, scope: string, parameters: NSDictionary<string, any>, callback: (p1: NSError, p2: A0Credentials) => void): void;

	resetPasswordWithEmailConnectionCallback(email: string, connection: string, callback: (p1: NSError) => void): void;

	setTelemetryEnabledWithEnabled(enabled: boolean): void;

	signUpWithEmailUsernamePasswordConnectionUserMetadataScopeParametersCallback(email: string, username: string, password: string, connection: string, userMetadata: NSDictionary<string, any>, scope: string, parameters: NSDictionary<string, any>, callback: (p1: NSError, p2: A0Credentials) => void): void;

	startPasswordlessWithCodeToEmailConnectionCallback(email: string, connection: string, callback: (p1: NSError) => void): void;

	startPasswordlessWithCodeToPhoneNumberConnectionCallback(phoneNumber: string, connection: string, callback: (p1: NSError) => void): void;

	startPasswordlessWithLinkToEmailConnectionCallback(email: string, connection: string, callback: (p1: NSError) => void): void;

	startPasswordlessWithLinkToPhoneNumberConnectionCallback(phoneNumber: string, connection: string, callback: (p1: NSError) => void): void;

	tokenInfoFromTokenCallback(token: string, callback: (p1: NSError, p2: A0Profile) => void): void;

	userInfoWithTokenCallback(token: string, callback: (p1: NSError, p2: A0Profile) => void): void;
}

declare class A0Credentials extends NSObject {

	static alloc(): A0Credentials; // inherited from NSObject

	static new(): A0Credentials; // inherited from NSObject

	readonly accessToken: string;

	readonly expiresIn: Date;

	readonly idToken: string;

	readonly refreshToken: string;

	readonly tokenType: string;

	constructor(o: { accessToken: string; tokenType: string; idToken: string; refreshToken: string; expiresIn: Date; });

	constructor(o: { json: NSDictionary<string, any>; });

	initWithAccessTokenTokenTypeIdTokenRefreshTokenExpiresIn(accessToken: string, tokenType: string, idToken: string, refreshToken: string, expiresIn: Date): this;

	initWithJson(json: NSDictionary<string, any>): this;
}

declare class A0Identity extends NSObject {

	static alloc(): A0Identity; // inherited from NSObject

	static new(): A0Identity; // inherited from NSObject

	readonly accessToken: string;

	readonly accessTokenSecret: string;

	readonly connection: string;

	readonly expiresIn: Date;

	readonly identifier: string;

	readonly profileData: NSDictionary<string, any>;

	readonly provider: string;

	readonly social: boolean;

	constructor(o: { identifier: string; provider: string; connection: string; social: boolean; profileData: NSDictionary<string, any>; accessToken: string; expiresIn: Date; accessTokenSecret: string; });

	constructor(o: { json: NSDictionary<string, any>; });

	initWithIdentifierProviderConnectionSocialProfileDataAccessTokenExpiresInAccessTokenSecret(identifier: string, provider: string, connection: string, social: boolean, profileData: NSDictionary<string, any>, accessToken: string, expiresIn: Date, accessTokenSecret: string): this;

	initWithJson(json: NSDictionary<string, any>): this;
}

declare class A0ManagementAPI extends NSObject {

	static alloc(): A0ManagementAPI; // inherited from NSObject

	static new(): A0ManagementAPI; // inherited from NSObject

	constructor(o: { token: string; });

	constructor(o: { token: string; url: NSURL; });

	constructor(o: { token: string; url: NSURL; session: NSURLSession; });

	initWithToken(token: string): this;

	initWithTokenUrl(token: string, url: NSURL): this;

	initWithTokenUrlSession(token: string, url: NSURL, session: NSURLSession): this;

	linkUserWithIdentifierWithUserUsingTokenCallback(identifier: string, token: string, callback: (p1: NSError, p2: NSArray<NSDictionary<string, any>>) => void): void;

	patchUserWithIdentifierUserMetadataCallback(identifier: string, userMetadata: NSDictionary<string, any>, callback: (p1: NSError, p2: NSDictionary<string, any>) => void): void;

	setTelemetryWithEnabled(enabled: boolean): void;

	unlinkUserWithIdentifierProviderFromUserIdCallback(identifier: string, provider: string, userId: string, callback: (p1: NSError, p2: NSArray<NSDictionary<string, any>>) => void): void;
}

declare class A0Profile extends NSObject {

	static alloc(): A0Profile; // inherited from NSObject

	static new(): A0Profile; // inherited from NSObject

	readonly additionalAttributes: NSDictionary<string, any>;

	readonly appMetadata: NSDictionary<string, any>;

	readonly createdAt: Date;

	readonly email: string;

	readonly emailVerified: boolean;

	readonly familyName: string;

	readonly givenName: string;

	readonly id: string;

	readonly identities: NSArray<A0Identity>;

	readonly name: string;

	readonly nickname: string;

	readonly pictureURL: NSURL;

	readonly userMetadata: NSDictionary<string, any>;

	constructor(o: { id: string; name: string; nickname: string; pictureURL: NSURL; createdAt: Date; email: string; emailVerified: boolean; givenName: string; familyName: string; attributes: NSDictionary<string, any>; identities: NSArray<A0Identity>; });

	constructor(o: { json: NSDictionary<string, any>; });

	initWithIdNameNicknamePictureURLCreatedAtEmailEmailVerifiedGivenNameFamilyNameAttributesIdentities(id: string, name: string, nickname: string, pictureURL: NSURL, createdAt: Date, email: string, emailVerified: boolean, givenName: string, familyName: string, attributes: NSDictionary<string, any>, identities: NSArray<A0Identity>): this;

	initWithJson(json: NSDictionary<string, any>): this;

	objectForKeyedSubscript(key: string): any;
}

declare class A0SHA256ChallengeGenerator extends NSObject {

	static alloc(): A0SHA256ChallengeGenerator; // inherited from NSObject

	static new(): A0SHA256ChallengeGenerator; // inherited from NSObject

	readonly challenge: string;

	readonly method: string;

	readonly verifier: string;

	constructor(o: { verifier: NSData; });

	initWithVerifier(verifier: NSData): this;
}

declare class A0WebAuth extends NSObject {

	static alloc(): A0WebAuth; // inherited from NSObject

	static new(): A0WebAuth; // inherited from NSObject

	static resumeAuthWithURLOptions(url: NSURL, options: NSDictionary<string, any>): boolean;

	connection: string;

	scope: string;

	universalLink: boolean;

	constructor(o: { clientId: string; url: NSURL; });

	addParameters(parameters: NSDictionary<string, string>): void;

	initWithClientIdUrl(clientId: string, url: NSURL): this;

	setTelemetryEnabled(enabled: boolean): void;

	start(callback: (p1: NSError, p2: A0Credentials) => void): void;
}

declare var Auth0VersionNumber: number;

declare var Auth0VersionNumberVar: number;

declare var Auth0VersionString: interop.Reference<number>;

declare var Auth0VersionStringVar: interop.Reference<number>;
