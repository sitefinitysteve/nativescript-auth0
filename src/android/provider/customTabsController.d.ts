import ComponentName = android.content.ComponentName;
import Context = android.content.Context;
import Uri = android.net.Uri;
import CustomTabsClient = androidx.browser.customtabs.CustomTabsClient;
import CustomTabsServiceConnection = androidx.browser.customtabs.CustomTabsServiceConnection;
import { CustomTabsOptions } from './customTabsOptions';
declare class CustomTabsController extends CustomTabsServiceConnection {
    private static readonly TAG;
    private static readonly MAX_WAIT_TIME_SECONDS;
    private static readonly ACTION_CUSTOM_TABS_CONNECTION;
    private static readonly CHROME_STABLE;
    private static readonly CHROME_SYSTEM;
    private static readonly CHROME_BETA;
    private static readonly CHROME_DEV;
    private readonly context;
    private readonly session;
    private readonly sessionLatch;
    private readonly preferredPackage;
    private customTabsOptions;
    private isBound;
    private sessionLatchReady;
    constructor(context: Context, browserPackage?: string);
    clearContext(): void;
    setCustomizationOptions(options?: CustomTabsOptions): void;
    getCustomizationOptions(): CustomTabsOptions;
    onCustomTabsServiceConnected(componentName: ComponentName, customTabsClient: CustomTabsClient): void;
    onServiceDisconnected(componentName: ComponentName): void;
    /**
     * Attempts to bind the Custom Tabs Service to the Context.
     */
    bindService(): void;
    /**
     * Attempts to unbind the Custom Tabs Service from the Context.
     */
    unbindService(): void;
    /**
     * Opens a Uri in a Custom Tab or Browser.
     * The Custom Tab service will be given up to {@link CustomTabsController#MAX_WAIT_TIME_SECONDS} to be connected.
     * If it fails to connect the Uri will be opened on a Browser.
     * <p>
     * In the exceptional case that no Browser app is installed on the device, this method will fail silently and do nothing.
     * Please, ensure the {@link Intent#ACTION_VIEW} action can be handled before calling this method.
     *
     * @param uri the uri to open in a Custom Tab or Browser.
     */
    launchUri(uri: Uri): void;
    /**
     * Query the OS for a Custom Tab compatible Browser application.
     * It will pick the default browser first if is Custom Tab compatible, then any Chrome browser or the first Custom Tab compatible browser.
     *
     * @param context a valid Context
     * @return the recommended Browser application package name, compatible with Custom Tabs. Null if no compatible browser is found.
     */
    static getBestBrowserPackage(context: Context): string;
}
export { CustomTabsController, CustomTabsOptions };
