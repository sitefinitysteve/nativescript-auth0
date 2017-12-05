
declare class AuthButton extends UIView {

	static alloc(): AuthButton; // inherited from NSObject

	static appearance(): AuthButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): AuthButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): AuthButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): AuthButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): AuthButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): AuthButton; // inherited from UIAppearance

	static new(): AuthButton; // inherited from NSObject

	color: UIColor;

	highlightedColor: UIColor;

	icon: UIImage;

	normalColor: UIColor;

	onPress: (p1: AuthButton) => void;

	title: string;

	titleColor: UIColor;
}

declare class HeaderView extends UIView {

	static alloc(): HeaderView; // inherited from NSObject

	static appearance(): HeaderView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): HeaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): HeaderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): HeaderView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): HeaderView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): HeaderView; // inherited from UIAppearance

	static new(): HeaderView; // inherited from NSObject

	blurStyle: UIBlurEffectStyle;

	blurred: boolean;

	logo: UIImage;

	maskColor: UIColor;

	maskImage: UIImage;

	onBackPressed: () => void;

	onClosePressed: () => void;

	showBack: boolean;

	showClose: boolean;

	title: string;

	titleColor: UIColor;
}

declare class Lock extends NSObject {

	static alloc(): Lock; // inherited from NSObject

	static classic(): Lock;

	static classicWithClientIdDomain(clientId: string, domain: string): Lock;

	static continueAuthUsing(userActivity: NSUserActivity): boolean;

	static new(): Lock; // inherited from NSObject

	static passwordless(): Lock;

	static passwordlessWithClientIdDomain(clientId: string, domain: string): Lock;

	static resumeAuthOptions(url: NSURL, options: NSDictionary<string, any>): boolean;

	readonly controller: LockViewController;

	static readonly bundle: NSBundle;

	allowedConnections(allowedConnections: NSArray<string>): Lock;

	onAuthWithCallback(callback: (p1: A0Credentials) => void): Lock;

	onCancelWithCallback(callback: () => void): Lock;

	onErrorWithCallback(callback: (p1: NSError) => void): Lock;

	onPasswordlessWithCallback(callback: (p1: string) => void): Lock;

	onSignUpWithCallback(callback: (p1: string, p2: NSDictionary<string, any>) => void): Lock;

	presentFrom(controller: UIViewController): void;
}

declare var LockVersionNumber: number;

declare var LockVersionString: interop.Reference<number>;

declare class LockViewController extends UIViewController {

	static alloc(): LockViewController; // inherited from NSObject

	static new(): LockViewController; // inherited from NSObject

	constructor(o: { lock: Lock; });

	initWithLock(lock: Lock): this;
}
