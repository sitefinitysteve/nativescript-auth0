declare class SilentSafariViewController extends SFSafariViewController implements SFSafariViewControllerDelegate {
    onResult: (result: boolean) => void;
    static alloc(): SilentSafariViewController;
    initWithURLCallback(URL: NSURL, callback: (result: boolean) => void): this;
    safariViewController(controller: SFSafariViewController, didLoadSuccessfully: boolean): void;
    static ObjCProtocols: {
        prototype: SFSafariViewControllerDelegate;
    }[];
}
export { SilentSafariViewController };
