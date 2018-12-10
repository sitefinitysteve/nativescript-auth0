import Bundle = android.os.Bundle;
import Intent = android.content.Intent;
export declare const KEY_REDIRECT_URI: string;
export declare const CONNECTION_NAME_EXTRA: string;
export declare const FULLSCREEN_EXTRA: string;
export declare class WebAuthActivity extends android.support.v7.app.AppCompatActivity {
    constructor();
    private webView;
    private errorView;
    private errorMessage;
    killActivity(intent: Intent): void;
    back(): void;
    onCreate(savedInstanceState?: Bundle): void;
    onWindowFocusChanged(hasFocus: boolean): void;
    private startUrlLoading;
    private renderLoadError;
    private isNetworkAvailable;
    private setFullscreenMode;
}
