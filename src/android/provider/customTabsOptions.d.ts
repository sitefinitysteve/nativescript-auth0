import Context = android.content.Context;
import Intent = android.content.Intent;
import Parcel = android.os.Parcel;
import Parcelable = android.os.Parcelable;
import CustomTabsSession = android.support.customtabs.CustomTabsSession;
export declare class CustomTabsOptions extends java.lang.Object {
    private showTitle;
    private toolbarColor;
    constructor();
    static create(showTitle?: boolean, toolbarColor?: number): CustomTabsOptions;
    toIntent(context: Context, session: CustomTabsSession): Intent;
    describeContents(): number;
    writeToParcel(dest: Parcel, flags: number): void;
    static readonly CREATOR: Parcelable.Creator<CustomTabsOptions>;
}
