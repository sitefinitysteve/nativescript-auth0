export declare class ControllerModalPresenter {
    get rootViewController(): UIViewController | undefined;
    present(controller: UIViewController): void;
    get topViewController(): UIViewController | undefined;
    private findTopViewController;
}
