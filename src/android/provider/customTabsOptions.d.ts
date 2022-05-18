import Context = android.content.Context;
import Intent = android.content.Intent;
import Parcel = android.os.Parcel;
import Parcelable = android.os.Parcelable;
import CustomTabsSession = androidx.browser.customtabs.CustomTabsSession;
/**
 * Holder for Custom Tabs customization options. Use {@link CustomTabsOptions#newBuilder()} to begin.
 */
declare class CustomTabsOptions extends java.lang.Object {
    private showTitle;
    private toolbarColor;
    constructor();
    static create(showTitle?: boolean, toolbarColor?: number): CustomTabsOptions;
    toIntent(context: Context, session: CustomTabsSession): Intent;
    describeContents(): number;
    writeToParcel(dest: Parcel, flags: number): void;
    static readonly CREATOR: Parcelable.Creator<CustomTabsOptions>;
}
export { CustomTabsOptions };
