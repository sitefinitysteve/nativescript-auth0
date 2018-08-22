export declare class ControllerModalPresenter {
    readonly rootViewController: UIViewController | undefined;
    present(controller: UIViewController): void;
    readonly topViewController: UIViewController | undefined;
    private findTopViewController;
}
