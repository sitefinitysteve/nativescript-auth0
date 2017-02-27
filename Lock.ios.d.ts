
declare class A0APIClient extends NSObject {

	static alloc(): A0APIClient; // inherited from NSObject

	static new(): A0APIClient; // inherited from NSObject

	static sharedClient(): A0APIClient;

	readonly application: A0Application;

	readonly baseURL: NSURL;

	readonly clientId: string;

	router: A0APIRouter;

	telemetryInfo: string;

	readonly tenant: string;

	constructor(o: { APIRouter: A0APIRouter; });

	constructor(o: { clientId: string; andTenant: string; });

	authenticateWithSocialConnectionNameCredentialsParametersSuccessFailure(connectionName: string, socialCredentials: A0IdentityProviderCredentials, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	changePasswordForUsernameParametersSuccessFailure(newPassword: string, username: string, parameters: A0AuthParameters, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	delegationWithIdTokenParametersSuccessFailure(idToken: string, parameters: A0AuthParameters, success: (p1: A0Token) => void, failure: (p1: NSError) => void): void;

	delegationWithRefreshTokenParametersSuccessFailure(refreshToken: string, parameters: A0AuthParameters, success: (p1: A0Token) => void, failure: (p1: NSError) => void): void;

	fetchAppInfoWithSuccessFailure(success: (p1: A0Application) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	fetchDelegationTokenWithParametersSuccessFailure(parameters: A0AuthParameters, success: (p1: NSDictionary<any, any>) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	fetchNewIdTokenWithIdTokenParametersSuccessFailure(idToken: string, parameters: A0AuthParameters, success: (p1: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	fetchNewIdTokenWithRefreshTokenParametersSuccessFailure(refreshToken: string, parameters: A0AuthParameters, success: (p1: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	fetchUserProfileWithAccessTokenSuccessFailure(accessToken: string, success: (p1: A0UserProfile) => void, failure: (p1: NSError) => void): void;

	fetchUserProfileWithIdTokenSuccessFailure(idToken: string, success: (p1: A0UserProfile) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	initWithAPIRouter(router: A0APIRouter): this;

	initWithClientIdAndTenant(clientId: string, tenant: string): this;

	loginWithEmailPasscodeParametersSuccessFailure(email: string, passcode: string, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	loginWithIdTokenDeviceNameParametersSuccessFailure(idToken: string, deviceName: string, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	loginWithPhoneNumberPasscodeParametersSuccessFailure(phoneNumber: string, passcode: string, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	loginWithUsernamePasswordParametersSuccessFailure(username: string, password: string, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	logout(): void;

	requestChangePasswordForUsernameParametersSuccessFailure(username: string, parameters: A0AuthParameters, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	requestTokenWithParametersCallback(parameters: NSDictionary<any, any>, callback: (p1: NSError, p2: A0Token) => void): NSURLSessionDataTask;

	signUpWithEmailPasswordLoginOnSuccessParametersSuccessFailure(email: string, password: string, loginOnSuccess: boolean, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	signUpWithEmailUsernamePasswordLoginOnSuccessParametersSuccessFailure(email: string, username: string, password: string, loginOnSuccess: boolean, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	signUpWithUsernamePasswordLoginOnSuccessParametersSuccessFailure(username: string, password: string, loginOnSuccess: boolean, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	startPasswordlessWithEmailSuccessFailure(email: string, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	startPasswordlessWithMagicLinkInEmailParametersSuccessFailure(email: string, parameters: A0AuthParameters, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	startPasswordlessWithMagicLinkInSMSParametersSuccessFailure(phoneNumber: string, parameters: A0AuthParameters, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	startPasswordlessWithPhoneNumberSuccessFailure(phoneNumber: string, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;

	unlinkAccountWithUserIdAccessTokenSuccessFailure(userId: string, accessToken: string, success: () => void, failure: (p1: NSError) => void): NSURLSessionDataTask;
}

interface A0APIClientProvider extends NSObjectProtocol {

	apiClient(): A0APIClient;
}
declare var A0APIClientProvider: {

	prototype: A0APIClientProvider;
};

interface A0APIRouter extends NSObjectProtocol {

	clientId: string;

	configurationURL: NSURL;

	endpointURL: NSURL;

	tenant: string;

	changePasswordPath(): string;

	delegationPath(): string;

	loginPath(): string;

	signUpPath(): string;

	socialLoginPath(): string;

	startPasswordless(): string;

	tokenInfoPath(): string;

	unlinkPath(): string;

	userInfoPath(): string;

	userPublicKeyPathForUser(userId: string): string;

	usersPath(): string;
}
declare var A0APIRouter: {

	prototype: A0APIRouter;
};

declare class A0APIv1Router extends NSObject implements A0APIRouter {

	static alloc(): A0APIv1Router; // inherited from NSObject

	static new(): A0APIv1Router; // inherited from NSObject

	readonly clientId: string; // inherited from A0APIRouter

	readonly configurationURL: NSURL; // inherited from A0APIRouter

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly endpointURL: NSURL; // inherited from A0APIRouter

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly tenant: string; // inherited from A0APIRouter

	readonly  // inherited from NSObjectProtocol

	constructor(o: { clientId: string; domainURL: NSURL; configurationURL: NSURL; });

	changePasswordPath(): string;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	delegationPath(): string;

	initWithClientIdDomainURLConfigurationURL(clientId: string, domainURL: NSURL, configurationURL: NSURL): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	loginPath(): string;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	signUpPath(): string;

	socialLoginPath(): string;

	startPasswordless(): string;

	tokenInfoPath(): string;

	unlinkPath(): string;

	userInfoPath(): string;

	userPublicKeyPathForUser(userId: string): string;

	usersPath(): string;
}

declare class A0Alert extends NSObject {

	static alloc(): A0Alert; // inherited from NSObject

	static new(): A0Alert; // inherited from NSObject

	static showInControllerAlert(controller: UIViewController, builder: (p1: A0Alert) => void): A0Alert;

	static showInControllerErrorAlert(controller: UIViewController, builder: (p1: A0Alert) => void): A0Alert;

	cancelTitle: string;

	message: string;

	title: string;

	addButtonWithTitleCallback(title: string, callback: () => void): void;

	showInController(controller: UIViewController): void;
}

declare class A0Application extends NSObject {

	static alloc(): A0Application; // inherited from NSObject

	static new(): A0Application; // inherited from NSObject

	readonly activeDirectoryStrategy: A0Strategy;

	readonly authorizeURL: NSURL;

	readonly databaseStrategy: A0Strategy;

	readonly enterpriseStrategies: NSArray<any>;

	readonly identifier: string;

	readonly socialStrategies: NSArray<any>;

	readonly strategies: NSArray<any>;

	readonly tenant: string;

	constructor(o: { JSONDictionary: NSDictionary<any, any>; });

	enterpriseStrategyWithConnection(connectionName: string): A0Strategy;

	initWithJSONDictionary(JSONDict: NSDictionary<any, any>): this;

	strategyByName(name: string): A0Strategy;
}

declare class A0AuthParameters extends NSObject implements NSCopying {

	static alloc(): A0AuthParameters; // inherited from NSObject

	static new(): A0AuthParameters; // inherited from NSObject

	static newDefaultParams(): A0AuthParameters;

	static newWithDictionary(dictionary: NSDictionary<any, any>): A0AuthParameters;

	static newWithScopes(scopes: NSArray<any>): A0AuthParameters;

	accessToken: string;

	connectionScopes: NSDictionary<any, any>;

	device: string;

	nonce: string;

	offlineMode: string;

	protocol: string;

	scopes: NSArray<any>;

	state: string;

	constructor(o: { dictionary: NSDictionary<any, any>; });

	constructor(o: { scopes: NSArray<any>; });

	addValuesFromDictionary(dictionary: NSDictionary<any, any>): void;

	addValuesFromParameters(parameters: A0AuthParameters): void;

	asAPIPayload(): NSDictionary<any, any>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDictionary(dictionary: NSDictionary<any, any>): this;

	initWithScopes(scopes: NSArray<any>): this;

	objectForKeyedSubscript(key: string): any;

	setObjectForKeyedSubscript(obj: any, key: string): void;

	setValueForKey(value: string, key: string): void;

	valueForKey(key: string): string;
}

interface A0AuthenticationProvider extends NSObjectProtocol {

	applicationLaunchedWithOptions(launchOptions: NSDictionary<any, any>): void;

	authenticateWithParametersSuccessFailure(parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): void;

	clearSessions(): void;

	handleURLSourceApplication(url: NSURL, sourceApplication: string): boolean;

	identifier(): string;
}
declare var A0AuthenticationProvider: {

	prototype: A0AuthenticationProvider;
};

interface A0AuthenticatorProvider extends NSObjectProtocol {

	identityProviderAuthenticator(): A0IdentityProviderAuthenticator;
}
declare var A0AuthenticatorProvider: {

	prototype: A0AuthenticatorProvider;
};

declare class A0BaseAuthenticator extends NSObject implements A0AuthenticationProvider {

	static alloc(): A0BaseAuthenticator; // inherited from NSObject

	static new(): A0BaseAuthenticator; // inherited from NSObject

	clientProvider: A0APIClientProvider;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	applicationLaunchedWithOptions(launchOptions: NSDictionary<any, any>): void;

	authenticateWithParametersSuccessFailure(parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): void;

	class(): typeof NSObject;

	clearSessions(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	handleURLSourceApplication(url: NSURL, sourceApplication: string): boolean;

	identifier(): string;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare const enum A0ChangePasswordIndentifierType {

	Username = 1,

	Email = 2
}

declare class A0ChangePasswordView extends UIView {

	static alloc(): A0ChangePasswordView; // inherited from NSObject

	static appearance(): A0ChangePasswordView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): A0ChangePasswordView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): A0ChangePasswordView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): A0ChangePasswordView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): A0ChangePasswordView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): A0ChangePasswordView; // inherited from UIAppearance

	static new(): A0ChangePasswordView; // inherited from NSObject

	delegate: A0ChangePasswordViewDelegate;

	identifier: string;

	identifierType: A0ChangePasswordIndentifierType;

	identifierValid: boolean;

	constructor(o: { theme: A0Theme; });

	initWithTheme(theme: A0Theme): this;
}

interface A0ChangePasswordViewDelegate extends NSObjectProtocol {

	changePasswordViewDidSubmitWithCompletionHandler(changePasswordView: A0ChangePasswordView, completionHandler: (p1: boolean) => void): void;
}
declare var A0ChangePasswordViewDelegate: {

	prototype: A0ChangePasswordViewDelegate;
};

declare var A0ClientInfoHeaderName: string;

declare var A0ClientInfoQueryParamName: string;

declare class A0ConfirmPasswordValidator extends NSObject implements A0FieldValidator {

	static alloc(): A0ConfirmPasswordValidator; // inherited from NSObject

	static new(): A0ConfirmPasswordValidator; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly identifier: string; // inherited from A0FieldValidator

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { field: UITextField; passwordField: UITextField; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithFieldPasswordField(field: UITextField, passwordField: UITextField): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	validate(): NSError;
}

declare var A0ConfirmPasswordValidatorIdentifer: string;

declare class A0Connection extends NSObject {

	static alloc(): A0Connection; // inherited from NSObject

	static new(): A0Connection; // inherited from NSObject

	readonly name: string;

	readonly values: NSDictionary<any, any>;

	constructor(o: { JSONDictionary: NSDictionary<any, any>; });

	initWithJSONDictionary(JSON: NSDictionary<any, any>): this;

	objectForKeyedSubscript(key: string): any;
}

declare var A0ConnectionDomain: string;

declare var A0ConnectionDomainAliases: string;

interface A0ConnectionDomainMatcher extends NSObjectProtocol {

	connectionForEmail(email: string): A0Connection;
}
declare var A0ConnectionDomainMatcher: {

	prototype: A0ConnectionDomainMatcher;
};

declare var A0ConnectionRequiresUsername: string;

declare var A0ConnectionShowForgot: string;

declare var A0ConnectionShowSignUp: string;

declare const enum A0ContainerLayoutVertical {

	Center = 0,

	Fill = 1
}

declare class A0ContainerViewController extends UIViewController {

	static alloc(): A0ContainerViewController; // inherited from NSObject

	static new(): A0ContainerViewController; // inherited from NSObject

	displayController(controller: UIViewController): void;

	displayControllerLayout(controller: UIViewController, layout: A0ContainerLayoutVertical): void;
}

interface A0CredentialProvider extends NSObjectProtocol {

	clientId(): string;

	configurationDomain(): string;

	domain(): string;
}
declare var A0CredentialProvider: {

	prototype: A0CredentialProvider;
};

declare class A0CredentialsValidator extends NSObject implements A0FieldValidator {

	static alloc(): A0CredentialsValidator; // inherited from NSObject

	static new(): A0CredentialsValidator; // inherited from NSObject

	flattenErrors: (p1: NSDictionary<any, any>) => NSError;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly identifier: string; // inherited from A0FieldValidator

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { validators: NSArray<any>; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithValidators(validators: NSArray<any>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	validate(): NSError;
}

declare var A0CredentialsValidatorErrorsKey: string;

declare class A0DeviceNameProvider extends NSObject {

	static alloc(): A0DeviceNameProvider; // inherited from NSObject

	static deviceName(): string;

	static new(): A0DeviceNameProvider; // inherited from NSObject
}

declare class A0EmailValidator extends NSObject implements A0FieldValidator {

	static alloc(): A0EmailValidator; // inherited from NSObject

	static new(): A0EmailValidator; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly identifier: string; // inherited from A0FieldValidator

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { field: UITextField; });

	constructor(o: { source: () => string; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithField(field: UITextField): this;

	initWithSource(source: () => string): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	validate(): NSError;
}

declare var A0EmailValidatorIdentifer: string;

declare const enum A0ErrorCode {

	AuthenticationFailed = 0,

	InvalidCredentials = 1,

	InvalidUsername = 2,

	InvalidEmail = 3,

	InvalidPassword = 4,

	InvalidPhoneNumber = 5,

	InvalidRepeatPassword = 6,

	InvalidPasswordAndRepeatPassword = 7,

	FacebookCancelled = 8,

	TwitterAppNotAuthorized = 9,

	TwitterCancelled = 10,

	TwitterNotConfigured = 11,

	TwitterInvalidAccount = 12,

	UknownProviderForStrategy = 13,

	Auth0Cancelled = 14,

	Auth0NotAuthorized = 15,

	Auth0InvalidConfiguration = 16,

	Auth0NoURLSchemeFound = 17,

	NoConnectionNameFound = 18,

	NotConnectedToInternet = 19,

	GooglePlusFailed = 20,

	GooglePlusCancelled = 21,

	ConfigurationLoadFailed = 22
}

declare var A0ErrorDomain: string;

interface A0ErrorHandler extends NSObjectProtocol {

	localizedMessageFromError(error: NSError): string;
}
declare var A0ErrorHandler: {

	prototype: A0ErrorHandler;
};

declare class A0Errors extends NSObject {

	static alloc(): A0Errors; // inherited from NSObject

	static auth0CancelledForConnectionName(connectionName: string): NSError;

	static auth0InvalidConfigurationForConnectionName(connectionName: string): NSError;

	static auth0NotAuthorizedForConnectionName(connectionName: string): NSError;

	static configurationLoadFailed(): NSError;

	static facebookCancelled(): NSError;

	static failedLoginWithConnectionNameFor(connectionName: string, error: NSError): NSError;

	static googleplusCancelled(): NSError;

	static googleplusFailed(): NSError;

	static invalidChangePasswordCredentialsUsingEmail(usesEmail: boolean): NSError;

	static invalidChangePasswordPassword(): NSError;

	static invalidChangePasswordRepeatPassword(): NSError;

	static invalidChangePasswordRepeatPasswordAndPassword(): NSError;

	static invalidChangePasswordUsernameUsingEmail(usesEmail: boolean): NSError;

	static invalidEmail(): NSError;

	static invalidLoginCredentialsUsingEmail(usesEmail: boolean): NSError;

	static invalidLoginPassword(): NSError;

	static invalidLoginUsernameUsingEmail(usesEmail: boolean): NSError;

	static invalidPassword(): NSError;

	static invalidPhoneNumber(): NSError;

	static invalidRepeatPassword(): NSError;

	static invalidSignUpCredentialsUsingEmail(usesEmail: boolean): NSError;

	static invalidSignUpPassword(): NSError;

	static invalidSignUpUsernameUsingEmail(usesEmail: boolean): NSError;

	static invalidUsername(): NSError;

	static new(): A0Errors; // inherited from NSObject

	static noConnectionNameFound(): NSError;

	static notConnectedToInternetError(): NSError;

	static twitterAppNotAuthorized(): NSError;

	static twitterAppOauthNotAuthorized(): NSError;

	static twitterCancelled(): NSError;

	static twitterInvalidAccount(): NSError;

	static twitterNotConfigured(): NSError;

	static unkownProviderForConnectionName(connectionName: string): NSError;

	static urlSchemeNotRegistered(): NSError;
}

interface A0FieldValidator extends NSObjectProtocol {

	identifier: string;

	validate(): NSError;
}
declare var A0FieldValidator: {

	prototype: A0FieldValidator;
};

declare class A0FileCredentialProvider extends NSObject implements A0CredentialProvider {

	static alloc(): A0FileCredentialProvider; // inherited from NSObject

	static new(): A0FileCredentialProvider; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { filePath: string; });

	class(): typeof NSObject;

	clientId(): string;

	configurationDomain(): string;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	domain(): string;

	initWithFilePath(path: string): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class A0FilteredConnectionDomainMatcher extends A0SimpleConnectionDomainMatcher {

	static alloc(): A0FilteredConnectionDomainMatcher; // inherited from NSObject

	static new(): A0FilteredConnectionDomainMatcher; // inherited from NSObject

	constructor(o: { strategies: NSArray<any>; filter: NSArray<any>; });

	initWithStrategiesFilter(strategies: NSArray<any>, strategyNamesToFilter: NSArray<any>): this;
}

declare class A0GenericAPIErrorHandler extends NSObject implements A0ErrorHandler {

	static alloc(): A0GenericAPIErrorHandler; // inherited from NSObject

	static handlerForCodeReturnMessage(code: string, message: string): A0GenericAPIErrorHandler;

	static handlerForCodesReturnMessage(codes: NSArray<any>, message: string): A0GenericAPIErrorHandler;

	static handlerForErrorStringReturnMessage(error: string, message: string): A0GenericAPIErrorHandler;

	static new(): A0GenericAPIErrorHandler; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	localizedMessageFromError(error: NSError): string;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class A0IdentityProviderAuthenticator extends NSObject {

	static alloc(): A0IdentityProviderAuthenticator; // inherited from NSObject

	static new(): A0IdentityProviderAuthenticator; // inherited from NSObject

	static sharedInstance(): A0IdentityProviderAuthenticator;

	useWebAsDefault: boolean;

	constructor(o: { lock: A0Lock; });

	applicationLaunchedWithOptions(launchOptions: NSDictionary<any, any>): void;

	authenticateForStrategyNameParametersSuccessFailure(strategyName: string, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): void;

	authenticateForStrategyParametersSuccessFailure(strategy: A0Strategy, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): void;

	authenticateWithConnectionNameParametersSuccessFailure(connectionName: string, parameters: A0AuthParameters, success: (p1: A0UserProfile, p2: A0Token) => void, failure: (p1: NSError) => void): void;

	canAuthenticateStrategy(strategy: A0Strategy): boolean;

	clearSessions(): void;

	configureForApplication(application: A0Application): void;

	handleURLSourceApplication(url: NSURL, application: string): boolean;

	initWithLock(lock: A0Lock): this;

	registerAuthenticationProvider(authenticationProvider: A0BaseAuthenticator): void;

	registerAuthenticationProviders(authenticationProviders: NSArray<any>): void;
}

declare class A0IdentityProviderCredentials extends NSObject {

	static alloc(): A0IdentityProviderCredentials; // inherited from NSObject

	static new(): A0IdentityProviderCredentials; // inherited from NSObject

	readonly accessToken: string;

	readonly extraInfo: NSDictionary<any, any>;

	constructor(o: { accessToken: string; });

	constructor(o: { accessToken: string; extraInfo: NSDictionary<any, any>; });

	initWithAccessToken(accessToken: string): this;

	initWithAccessTokenExtraInfo(accessToken: string, extraInfo: NSDictionary<any, any>): this;
}

declare var A0JSONResponseSerializerErrorDataKey: string;

interface A0KeyboardEnabledView extends NSObjectProtocol {

	hideKeyboard(): void;

	rectToKeepVisibleInView(view: UIView): CGRect;
}
declare var A0KeyboardEnabledView: {

	prototype: A0KeyboardEnabledView;
};

declare class A0LoadingView extends UIView {

	static alloc(): A0LoadingView; // inherited from NSObject

	static appearance(): A0LoadingView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): A0LoadingView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): A0LoadingView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): A0LoadingView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): A0LoadingView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): A0LoadingView; // inherited from UIAppearance

	static new(): A0LoadingView; // inherited from NSObject

	message: string;
}

declare class A0Lock extends NSObject implements A0APIClientProvider, A0AuthenticatorProvider {

	static alloc(): A0Lock; // inherited from NSObject

	static new(): A0Lock; // inherited from NSObject

	static newLock(): A0Lock;

	static newLockWithClientIdDomain(clientId: string, domain: string): A0Lock;

	static newLockWithClientIdDomainConfigurationDomain(clientId: string, domain: string, configurationDomain: string): A0Lock;

	static sharedLock(): A0Lock;

	readonly clientId: string;

	readonly configurationURL: NSURL;

	readonly domainURL: NSURL;

	telemetry: A0Telemetry;

	usePKCE: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { clientId: string; domain: string; });

	constructor(o: { clientId: string; domain: string; configurationDomain: string; });

	apiClient(): A0APIClient;

	applicationLaunchedWithOptions(launchOptions: NSDictionary<any, any>): void;

	class(): typeof NSObject;

	clearSessions(): void;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	continueUserActivityRestorationHandler(userActivity: NSUserActivity, restorationHandler: (p1: NSArray<any>) => void): boolean;

	handleURLSourceApplication(url: NSURL, sourceApplication: string): boolean;

	identityProviderAuthenticator(): A0IdentityProviderAuthenticator;

	initWithClientIdDomain(clientId: string, domain: string): this;

	initWithClientIdDomainConfigurationDomain(clientId: string, domain: string, configurationDomain: string): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	newLockViewController(): A0LockViewController;

	newSignUpViewController(): A0LockSignUpViewController;

	newUserAPIClientWithIdToken(idToken: string): A0UserAPIClient;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	presentLockControllerFromController(lockController: A0LockViewController, controller: UIViewController): void;

	presentLockControllerFromControllerPresentationStyle(lockController: A0LockViewController, controller: UIViewController, presentationStyle: UIModalPresentationStyle): void;

	registerAuthenticators(authenticators: NSArray<any>): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class A0LockConfiguration extends NSObject {

	static alloc(): A0LockConfiguration; // inherited from NSObject

	static new(): A0LockConfiguration; // inherited from NSObject

	readonly application: A0Application;

	defaultDatabaseConnectionName: string;

	enterpriseConnectionsUsingWebForm: NSArray<any>;

	constructor(o: { application: A0Application; filter: NSArray<any>; });

	activeDirectoryStrategy(): A0Strategy;

	defaultActiveDirectoryConnection(): A0Connection;

	defaultDatabaseConnection(): A0Connection;

	enterpriseStrategies(): NSArray<any>;

	initWithApplicationFilter(application: A0Application, connectionNames: NSArray<any>): this;

	shouldDisableResetPassword(disableResetPassword: boolean): boolean;

	shouldDisableSignUp(disableSignUp: boolean): boolean;

	shouldUseWebAuthenticationForConnection(connection: A0Connection): boolean;

	socialStrategies(): NSArray<any>;
}

declare class A0LockEventDelegate extends NSObject {

	static alloc(): A0LockEventDelegate; // inherited from NSObject

	static new(): A0LockEventDelegate; // inherited from NSObject

	constructor(o: { lockViewController: A0LockViewController; });

	backToLock(): void;

	dismissLock(): void;

	initWithLockViewController(controller: A0LockViewController): this;

	userAuthenticatedWithTokenProfile(token: A0Token, profile: A0UserProfile): void;
}

declare class A0LockLogger extends NSObject {

	static alloc(): A0LockLogger; // inherited from NSObject

	static logAll(): void;

	static logError(): void;

	static logOff(): void;

	static new(): A0LockLogger; // inherited from NSObject
}

declare var A0LockNotificationChangePasswordFailed: string;

declare var A0LockNotificationChangePasswordSuccessful: string;

declare var A0LockNotificationConnectionParameterKey: string;

declare var A0LockNotificationEmailParameterKey: string;

declare var A0LockNotificationErrorParameterKey: string;

declare var A0LockNotificationLockDismissed: string;

declare var A0LockNotificationLoginFailed: string;

declare var A0LockNotificationLoginSuccessful: string;

declare var A0LockNotificationSignUpFailed: string;

declare var A0LockNotificationSignUpSuccessful: string;

declare var A0LockNotificationUniversalLinkParameterKey: string;

declare var A0LockNotificationUniversalLinkReceived: string;

declare class A0LockSignUpViewController extends UIViewController {

	static alloc(): A0LockSignUpViewController; // inherited from NSObject

	static new(): A0LockSignUpViewController; // inherited from NSObject

	authenticationParameters: A0AuthParameters;

	connections: NSArray<any>;

	defaultDatabaseConnectionName: string;

	loginAfterSignUp: boolean;

	onAuthenticationBlock: (p1: A0UserProfile, p2: A0Token) => void;

	onUserDismissBlock: () => void;

	useWebView: boolean;

	constructor(o: { lock: A0Lock; });

	initWithLock(lock: A0Lock): this;
}

declare class A0LockViewController extends A0ContainerViewController {

	static alloc(): A0LockViewController; // inherited from NSObject

	static new(): A0LockViewController; // inherited from NSObject

	authenticationParameters: A0AuthParameters;

	closable: boolean;

	connections: NSArray<any>;

	customSignUp: (p1: A0Lock, p2: A0LockEventDelegate) => UIViewController;

	defaultADUsernameFromEmailPrefix: boolean;

	defaultDatabaseConnectionName: string;

	defaultIdentifier: string;

	disableResetPassword: boolean;

	disableSignUp: boolean;

	enterpriseConnectionsUsingWebForm: NSArray<string>;

	loginAfterSignUp: boolean;

	onAuthenticationBlock: (p1: A0UserProfile, p2: A0Token) => void;

	onUserDismissBlock: () => void;

	signUpDisclaimerView: UIView;

	useWebView: boolean;

	usesEmail: boolean;

	constructor(o: { lock: A0Lock; });

	initWithLock(lock: A0Lock): this;
}

declare const enum A0LoginIndentifierType {

	Username = 1,

	Email = 2
}

declare class A0LoginView extends UIView {

	static alloc(): A0LoginView; // inherited from NSObject

	static appearance(): A0LoginView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): A0LoginView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): A0LoginView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): A0LoginView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): A0LoginView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): A0LoginView; // inherited from UIAppearance

	static new(): A0LoginView; // inherited from NSObject

	delegate: A0LoginViewDelegate;

	readonly enterpriseSSOEnabled: boolean;

	identifier: string;

	identifierType: A0LoginIndentifierType;

	identifierValid: boolean;

	password: string;

	passwordValid: boolean;

	ssoView: UIView;

	constructor(o: { theme: A0Theme; });

	disableEnterpriseSSO(): void;

	initWithTheme(theme: A0Theme): this;

	showEnterpriseSSOForConnectionName(connectionName: string): void;
}

interface A0LoginViewDelegate extends NSObjectProtocol {

	loginViewDidChangeUsername(loginView: A0LoginView, username: string): void;

	loginViewDidSubmitWithCompletionHandler(loginView: A0LoginView, completionHandler: (p1: boolean) => void): void;
}
declare var A0LoginViewDelegate: {

	prototype: A0LoginViewDelegate;
};

declare class A0MFACodeView extends UIView {

	static alloc(): A0MFACodeView; // inherited from NSObject

	static appearance(): A0MFACodeView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): A0MFACodeView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): A0MFACodeView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): A0MFACodeView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): A0MFACodeView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): A0MFACodeView; // inherited from UIAppearance

	static new(): A0MFACodeView; // inherited from NSObject

	code: string;

	codeValid: boolean;

	delegate: A0MFACodeViewDelegate;

	constructor(o: { theme: A0Theme; });

	initWithTheme(theme: A0Theme): this;
}

interface A0MFACodeViewDelegate extends NSObjectProtocol {

	mfaCodeViewDidSubmitWithCompletionHandler(mfaCodeView: A0MFACodeView, completionHandler: (p1: boolean) => void): void;
}
declare var A0MFACodeViewDelegate: {

	prototype: A0MFACodeViewDelegate;
};

declare class A0MainBundleCredentialProvider extends NSObject implements A0CredentialProvider {

	static alloc(): A0MainBundleCredentialProvider; // inherited from NSObject

	static new(): A0MainBundleCredentialProvider; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	clientId(): string;

	configurationDomain(): string;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	domain(): string;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class A0ModalPresenter extends NSObject {

	static alloc(): A0ModalPresenter; // inherited from NSObject

	static new(): A0ModalPresenter; // inherited from NSObject

	presentControllerCompletion(controller: UIViewController, completion: () => void): void;
}

declare class A0PKCE extends NSObject {

	static alloc(): A0PKCE; // inherited from NSObject

	static new(): A0PKCE; // inherited from NSObject

	readonly authorizationParameters: NSDictionary<string, string>;

	readonly challenge: string;

	readonly method: string;

	readonly verifier: string;

	constructor(o: { verifier: string; });

	initWithVerifier(verifier: string): this;

	tokenParametersWithAuthorizationCode(authorizationCode: string): NSDictionary<string, string>;
}

declare var A0ParameterAPIType: string;

declare var A0ParameterAccessToken: string;

declare var A0ParameterConnection: string;

declare var A0ParameterConnectionScopes: string;

declare var A0ParameterDevice: string;

declare var A0ParameterMainAccessToken: string;

declare var A0ParameterNonce: string;

declare var A0ParameterOfflineMode: string;

declare var A0ParameterProtocol: string;

declare var A0ParameterScope: string;

declare var A0ParameterState: string;

declare var A0ParameterTarget: string;

declare class A0PasswordStrengthErrorHandler extends NSObject implements A0ErrorHandler {

	static alloc(): A0PasswordStrengthErrorHandler; // inherited from NSObject

	static new(): A0PasswordStrengthErrorHandler; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	localizedMessageFromError(error: NSError): string;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class A0PasswordValidator extends NSObject implements A0FieldValidator {

	static alloc(): A0PasswordValidator; // inherited from NSObject

	static new(): A0PasswordValidator; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly identifier: string; // inherited from A0FieldValidator

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { field: UITextField; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithField(field: UITextField): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	validate(): NSError;
}

declare var A0PasswordValidatorIdentifer: string;

declare const enum A0PasswordlessLockStrategy {

	EmailMagicLink = 0,

	SMSMagicLink = 1,

	EmailCode = 2,

	SMSCode = 3
}

declare class A0PasswordlessLockViewModel extends NSObject {

	static alloc(): A0PasswordlessLockViewModel; // inherited from NSObject

	static new(): A0PasswordlessLockViewModel; // inherited from NSObject

	readonly hasIdentifier: boolean;

	identifier: string;

	readonly identifierError: NSError;

	onAuthentication: (p1: A0UserProfile, p2: A0Token) => void;

	onMagicLink: (p1: NSError, p2: boolean) => void;

	constructor(o: { lock: A0Lock; authenticationParameters: A0AuthParameters; strategy: A0PasswordlessLockStrategy; });

	authenticateWithVerificationCodeCallback(verificationCode: string, callback: (p1: NSError) => void): void;

	initWithLockAuthenticationParametersStrategy(lock: A0Lock, parameters: A0AuthParameters, strategy: A0PasswordlessLockStrategy): this;

	requestVerificationCodeWithCallback(callback: (p1: NSError) => void): void;
}

declare class A0PhoneNumberValidator extends NSObject implements A0FieldValidator {

	static alloc(): A0PhoneNumberValidator; // inherited from NSObject

	static new(): A0PhoneNumberValidator; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly identifier: string; // inherited from A0FieldValidator

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { source: () => string; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithSource(source: () => string): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	validate(): NSError;
}

declare var A0PhoneNumberValidatorIdentifer: string;

declare class A0RuleErrorHandler extends NSObject implements A0ErrorHandler {

	static alloc(): A0RuleErrorHandler; // inherited from NSObject

	static handler(): A0RuleErrorHandler;

	static new(): A0RuleErrorHandler; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	localizedMessageFromError(error: NSError): string;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare var A0ScopeOfflineAccess: string;

declare var A0ScopeOpenId: string;

declare var A0ScopeProfile: string;

declare class A0ServiceTheme extends NSObject {

	static alloc(): A0ServiceTheme; // inherited from NSObject

	static new(): A0ServiceTheme; // inherited from NSObject

	foregroundColor: UIColor;

	highlightedBackgroundColor: UIColor;

	readonly iconImage: UIImage;

	iconImageBundle: NSBundle;

	iconImageName: string;

	iconImageRenderingMode: UIImageRenderingMode;

	localizedTitle: string;

	readonly name: string;

	normalBackgroundColor: UIColor;

	constructor(o: { name: string; values: NSDictionary<string, any>; });

	initWithNameValues(name: string, values: NSDictionary<string, any>): this;
}

declare var A0ServiceThemeForegroundColor: string;

declare var A0ServiceThemeHighlightedBackgroundColor: string;

declare var A0ServiceThemeIconImageName: string;

declare var A0ServiceThemeLocalizedTitle: string;

declare var A0ServiceThemeNormalBackgroundColor: string;

declare const enum A0SignUpIndentifierType {

	Username = 1,

	Email = 2
}

declare class A0SignUpView extends UIView {

	static alloc(): A0SignUpView; // inherited from NSObject

	static appearance(): A0SignUpView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): A0SignUpView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): A0SignUpView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): A0SignUpView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): A0SignUpView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): A0SignUpView; // inherited from UIAppearance

	static new(): A0SignUpView; // inherited from NSObject

	delegate: A0SignUpViewDelegate;

	identifier: string;

	identifierType: A0SignUpIndentifierType;

	identifierValid: boolean;

	password: string;

	passwordValid: boolean;

	title: string;

	username: string;

	usernameValid: boolean;

	constructor(o: { theme: A0Theme; requiresUsername: boolean; });

	initWithThemeRequiresUsername(theme: A0Theme, requiresUsername: boolean): this;
}

interface A0SignUpViewDelegate extends NSObjectProtocol {

	signUpViewDidSubmitWithCompletionHandler(signUpView: A0SignUpView, completionHandler: (p1: boolean) => void): void;
}
declare var A0SignUpViewDelegate: {

	prototype: A0SignUpViewDelegate;
};

declare class A0SimpleConnectionDomainMatcher extends NSObject implements A0ConnectionDomainMatcher {

	static alloc(): A0SimpleConnectionDomainMatcher; // inherited from NSObject

	static new(): A0SimpleConnectionDomainMatcher; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { strategies: NSArray<any>; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	connectionForEmail(email: string): A0Connection;

	initWithStrategies(strategies: NSArray<any>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class A0Strategy extends NSObject {

	static alloc(): A0Strategy; // inherited from NSObject

	static new(): A0Strategy; // inherited from NSObject

	static newDatabaseStrategyWithConnections(connections: NSArray<any>): A0Strategy;

	static newEnterpriseStrategyWithNameConnections(name: string, connections: NSArray<any>): A0Strategy;

	readonly connections: NSArray<any>;

	readonly name: string;

	readonly type: A0StrategyType;

	readonly useResourceOwnerEndpoint: boolean;

	constructor(o: { JSONDictionary: NSDictionary<any, any>; });

	constructor(o: { name: string; connections: NSArray<any>; type: A0StrategyType; });

	hasConnectionWithName(name: string): boolean;

	initWithJSONDictionary(JSONDictionary: NSDictionary<any, any>): this;

	initWithNameConnectionsType(name: string, connections: NSArray<any>, type: A0StrategyType): this;
}

declare var A0StrategyName37Signals: string;

declare var A0StrategyNameADFS: string;

declare var A0StrategyNameAOL: string;

declare var A0StrategyNameActiveDirectory: string;

declare var A0StrategyNameAmazon: string;

declare var A0StrategyNameAuth0: string;

declare var A0StrategyNameAuth0LDAP: string;

declare var A0StrategyNameBaidu: string;

declare var A0StrategyNameBox: string;

declare var A0StrategyNameCustom: string;

declare var A0StrategyNameDwolla: string;

declare var A0StrategyNameEBay: string;

declare var A0StrategyNameEmail: string;

declare var A0StrategyNameEvernote: string;

declare var A0StrategyNameEvernoteSandbox: string;

declare var A0StrategyNameFacebook: string;

declare var A0StrategyNameFitbit: string;

declare var A0StrategyNameGithub: string;

declare var A0StrategyNameGoogleApps: string;

declare var A0StrategyNameGoogleOpenId: string;

declare var A0StrategyNameGooglePlus: string;

declare var A0StrategyNameIP: string;

declare var A0StrategyNameInstagram: string;

declare var A0StrategyNameLinkedin: string;

declare var A0StrategyNameMSCRM: string;

declare var A0StrategyNameMiicard: string;

declare var A0StrategyNameOffice365: string;

declare var A0StrategyNamePaypal: string;

declare var A0StrategyNamePingFederate: string;

declare var A0StrategyNamePlanningCenter: string;

declare var A0StrategyNameRenRen: string;

declare var A0StrategyNameSAMLP: string;

declare var A0StrategyNameSMS: string;

declare var A0StrategyNameSalesforce: string;

declare var A0StrategyNameSalesforceSandbox: string;

declare var A0StrategyNameSharepoint: string;

declare var A0StrategyNameShopify: string;

declare var A0StrategyNameSoundcloud: string;

declare var A0StrategyNameTheCity: string;

declare var A0StrategyNameTheCitySandbox: string;

declare var A0StrategyNameTwitter: string;

declare var A0StrategyNameVK: string;

declare var A0StrategyNameWaad: string;

declare var A0StrategyNameWeibo: string;

declare var A0StrategyNameWindowsLive: string;

declare var A0StrategyNameWordpress: string;

declare var A0StrategyNameYahoo: string;

declare var A0StrategyNameYammer: string;

declare var A0StrategyNameYandex: string;

declare var A0StrategySocialTokenParameter: string;

declare var A0StrategySocialTokenSecretParameter: string;

declare var A0StrategySocialUserIdParameter: string;

declare const enum A0StrategyType {

	Social = 0,

	Database = 1,

	Enterprise = 2,

	Passwordless = 3
}

declare class A0Telemetry extends NSObject {

	static alloc(): A0Telemetry; // inherited from NSObject

	static libraryName(): string;

	static libraryVersion(): string;

	static new(): A0Telemetry; // inherited from NSObject

	static platform(): string;

	static telemetryEnabled(): boolean;

	readonly base64Value: string;

	constructor(o: { name: string; version: string; extra: NSDictionary<any, any>; });

	initWithNameVersionExtra(name: string, version: string, extra: NSDictionary<any, any>): this;
}

declare class A0Theme extends NSObject {

	static alloc(): A0Theme; // inherited from NSObject

	static new(): A0Theme; // inherited from NSObject

	static sharedInstance(): A0Theme;

	customThemeForConnection: (p1: string, p2: A0ServiceTheme) => A0ServiceTheme;

	statusBarHidden: boolean;

	statusBarStyle: UIStatusBarStyle;

	colorForKey(key: string): UIColor;

	colorForKeyDefaultColor(key: string, defaultColor: UIColor): UIColor;

	configureLabel(label: UILabel): void;

	configureMultilineLabelWithText(label: UILabel, text: string): void;

	configurePrimaryButton(button: UIButton): void;

	configureSecondaryButton(button: UIButton): void;

	configureTextField(textField: UITextField): void;

	fontForKey(key: string): UIFont;

	fontForKeyDefaultFont(key: string, defaultFont: UIFont): UIFont;

	imageForKey(key: string): UIImage;

	imageForKeyDefaultImage(key: string, image: UIImage): UIImage;

	registerColorForKey(color: UIColor, key: string): void;

	registerDefaultTheme(): void;

	registerFontForKey(font: UIFont, key: string): void;

	registerImageWithNameBundleForKey(name: string, bundle: NSBundle, key: string): void;

	registerImageWithNameForKey(name: string, key: string): void;

	registerTheme(theme: A0Theme): void;

	themeForStrategyNameAndConnectionName(strategyName: string, connectionName: string): A0ServiceTheme;
}

declare var A0ThemeCloseButtonImageName: string;

declare var A0ThemeCloseButtonTintColor: string;

declare var A0ThemeCredentialBoxBackgroundColor: string;

declare var A0ThemeCredentialBoxBorderColor: string;

declare var A0ThemeCredentialBoxSeparatorColor: string;

declare var A0ThemeDescriptionFont: string;

declare var A0ThemeDescriptionTextColor: string;

declare var A0ThemeIconBackgroundColor: string;

declare var A0ThemeIconEmail: string;

declare var A0ThemeIconImageName: string;

declare var A0ThemeIconLock: string;

declare var A0ThemeIconPhone: string;

declare var A0ThemeIconUsername: string;

declare var A0ThemePrimaryButtonFont: string;

declare var A0ThemePrimaryButtonHighlightedColor: string;

declare var A0ThemePrimaryButtonHighlightedImageName: string;

declare var A0ThemePrimaryButtonNormalColor: string;

declare var A0ThemePrimaryButtonNormalImageName: string;

declare var A0ThemePrimaryButtonTextColor: string;

declare var A0ThemeScreenBackgroundColor: string;

declare var A0ThemeScreenBackgroundImageName: string;

declare var A0ThemeSecondaryButtonBackgroundColor: string;

declare var A0ThemeSecondaryButtonFont: string;

declare var A0ThemeSecondaryButtonHighlightedImageName: string;

declare var A0ThemeSecondaryButtonNormalImageName: string;

declare var A0ThemeSecondaryButtonTextColor: string;

declare var A0ThemeSeparatorTextColor: string;

declare var A0ThemeSeparatorTextFont: string;

declare var A0ThemeTextFieldFont: string;

declare var A0ThemeTextFieldIconColor: string;

declare var A0ThemeTextFieldPlaceholderTextColor: string;

declare var A0ThemeTextFieldTextColor: string;

declare var A0ThemeTitleFont: string;

declare var A0ThemeTitleTextColor: string;

declare var A0ThemeTouchIDLockButtonImageHighlightedName: string;

declare var A0ThemeTouchIDLockButtonImageNormalName: string;

declare var A0ThemeTouchIDLockContainerBackgroundColor: string;

declare class A0Token extends NSObject implements NSSecureCoding {

	static alloc(): A0Token; // inherited from NSObject

	static new(): A0Token; // inherited from NSObject

	readonly accessToken: string;

	readonly idToken: string;

	readonly refreshToken: string;

	readonly tokenType: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { accessToken: string; idToken: string; tokenType: string; refreshToken: string; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { dictionary: NSDictionary<any, any>; });

	encodeWithCoder(aCoder: NSCoder): void;

	initWithAccessTokenIdTokenTokenTypeRefreshToken(accessToken: string, idToken: string, tokenType: string, refreshToken: string): this;

	initWithCoder(aDecoder: NSCoder): this;

	initWithDictionary(dictionary: NSDictionary<any, any>): this;
}

declare class A0UserAPIClient extends NSObject {

	static alloc(): A0UserAPIClient; // inherited from NSObject

	static clientWithAccessToken(accessToken: string): A0UserAPIClient;

	static clientWithIdToken(idToken: string): A0UserAPIClient;

	static new(): A0UserAPIClient; // inherited from NSObject

	constructor(o: { clientId: string; tenant: string; accessToken: string; });

	constructor(o: { clientId: string; tenant: string; idToken: string; });

	constructor(o: { router: A0APIRouter; accessToken: string; });

	constructor(o: { router: A0APIRouter; idToken: string; });

	fetchUserProfileSuccessFailure(success: (p1: A0UserProfile) => void, failure: (p1: NSError) => void): void;

	initWithClientIdTenantAccessToken(clientId: string, tenant: string, accessToken: string): this;

	initWithClientIdTenantIdToken(clientId: string, tenant: string, idToken: string): this;

	initWithRouterAccessToken(router: A0APIRouter, accessToken: string): this;

	initWithRouterIdToken(router: A0APIRouter, idToken: string): this;

	registerPublicKeyDeviceUserSuccessFailure(pubKey: NSData, deviceName: string, userId: string, success: () => void, failure: (p1: NSError) => void): void;

	removePublicKeyOfDeviceUserSuccessFailure(deviceName: string, userId: string, success: () => void, failure: (p1: NSError) => void): void;
}

declare class A0UserIdentity extends NSObject implements NSCoding {

	static alloc(): A0UserIdentity; // inherited from NSObject

	static new(): A0UserIdentity; // inherited from NSObject

	readonly accessToken: string;

	readonly accessTokenSecret: string;

	readonly connection: string;

	readonly identityId: string;

	readonly profileData: NSDictionary<any, any>;

	readonly provider: string;

	readonly social: boolean;

	readonly userId: string;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { JSONDictionary: NSDictionary<any, any>; });

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	initWithJSONDictionary(JSONDict: NSDictionary<any, any>): this;
}

declare class A0UserProfile extends NSObject implements NSSecureCoding {

	static alloc(): A0UserProfile; // inherited from NSObject

	static new(): A0UserProfile; // inherited from NSObject

	readonly appMetadata: NSDictionary<any, any>;

	readonly createdAt: Date;

	readonly email: string;

	readonly extraInfo: NSDictionary<any, any>;

	readonly identities: NSArray<any>;

	readonly name: string;

	readonly nickname: string;

	readonly picture: NSURL;

	readonly userId: string;

	readonly userMetadata: NSDictionary<any, any>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { dictionary: NSDictionary<any, any>; });

	constructor(o: { userId: string; name: string; nickname: string; email: string; picture: NSURL; createdAt: Date; });

	encodeWithCoder(aCoder: NSCoder): void;

	initWithCoder(aDecoder: NSCoder): this;

	initWithDictionary(dictionary: NSDictionary<any, any>): this;

	initWithUserIdNameNicknameEmailPictureCreatedAt(userId: string, name: string, nickname: string, email: string, picture: NSURL, createdAt: Date): this;
}

declare class A0UsernameValidator extends NSObject implements A0FieldValidator {

	static alloc(): A0UsernameValidator; // inherited from NSObject

	static databaseValidatorForFieldWithMinimumAndMaximum(field: UITextField, minimum: number, maximum: number): A0UsernameValidator;

	static new(): A0UsernameValidator; // inherited from NSObject

	static nonEmtpyValidatorForField(field: UITextField): A0UsernameValidator;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly identifier: string; // inherited from A0FieldValidator

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	validate(): NSError;
}

declare var A0UsernameValidatorIdentifier: string;

interface A0WebAuthenticable extends NSObjectProtocol {

	setLocalizedCancelButtonTitle(localizedCancelButtonTitle: string): void;

	setOnAuthentication(success: (p1: A0UserProfile, p2: A0Token) => void): void;

	setOnFailure(error: (p1: NSError) => void): void;

	setTelemetryInfo(telemetryInfo: string): void;
}
declare var A0WebAuthenticable: {

	prototype: A0WebAuthenticable;
};

declare class A0WebKitViewController extends UIViewController implements A0WebAuthenticable {

	static alloc(): A0WebKitViewController; // inherited from NSObject

	static new(): A0WebKitViewController; // inherited from NSObject

	localizedCancelButtonTitle: string;

	onAuthentication: (p1: A0UserProfile, p2: A0Token) => void;

	onFailure: (p1: NSError) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { APIClient: A0APIClient; connectionName: string; parameters: A0AuthParameters; });

	constructor(o: { APIClient: A0APIClient; connectionName: string; parameters: A0AuthParameters; usePKCE: boolean; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithAPIClientConnectionNameParameters(client: A0APIClient, connectionName: string, parameters: A0AuthParameters): this;

	initWithAPIClientConnectionNameParametersUsePKCE(client: A0APIClient, connectionName: string, parameters: A0AuthParameters, usePKCE: boolean): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setLocalizedCancelButtonTitle(localizedCancelButtonTitle: string): void;

	setOnAuthentication(success: (p1: A0UserProfile, p2: A0Token) => void): void;

	setOnFailure(error: (p1: NSError) => void): void;

	setTelemetryInfo(telemetryInfo: string): void;
}

declare class A0WebViewAuthenticator extends A0BaseAuthenticator {

	static alloc(): A0WebViewAuthenticator; // inherited from NSObject

	static new(): A0WebViewAuthenticator; // inherited from NSObject

	localizedCancelButtonTitle: string;

	constructor(o: { connectionName: string; lock: A0Lock; });

	initWithConnectionNameLock(connectionName: string, lock: A0Lock): this;
}

declare var A0WebViewAuthenticatorTitleBarBarTintColor: string;

declare var A0WebViewAuthenticatorTitleBarTintColor: string;

declare var A0WebViewAuthenticatorTitleTextColor: string;

declare var A0WebViewAuthenticatorTitleTextFont: string;

declare class A0WebViewController extends UIViewController implements A0WebAuthenticable {

	static alloc(): A0WebViewController; // inherited from NSObject

	static new(): A0WebViewController; // inherited from NSObject

	localizedCancelButtonTitle: string;

	onAuthentication: (p1: A0UserProfile, p2: A0Token) => void;

	onFailure: (p1: NSError) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { APIClient: A0APIClient; connectionName: string; parameters: A0AuthParameters; });

	constructor(o: { APIClient: A0APIClient; connectionName: string; parameters: A0AuthParameters; usePKCE: boolean; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithAPIClientConnectionNameParameters(client: A0APIClient, connectionName: string, parameters: A0AuthParameters): this;

	initWithAPIClientConnectionNameParametersUsePKCE(client: A0APIClient, connectionName: string, parameters: A0AuthParameters, usePKCE: boolean): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setLocalizedCancelButtonTitle(localizedCancelButtonTitle: string): void;

	setOnAuthentication(success: (p1: A0UserProfile, p2: A0Token) => void): void;

	setOnFailure(error: (p1: NSError) => void): void;

	setTelemetryInfo(telemetryInfo: string): void;
}

declare var LockVersionNumber: number;

declare var LockVersionString: interop.Reference<number>;
