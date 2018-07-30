import Context = android.content.Context;
import Intent = android.content.Intent;
import Parcel = android.os.Parcel;
import Parcelable = android.os.Parcelable;
import CustomTabsSession = android.support.customtabs.CustomTabsSession;
export declare class CustomTabsOptions extends java.lang.Object implements Parcelable {
    private readonly showTitle;
    private readonly toolbarColor;
    constructor(showTitle?: boolean, toolbarColor?: number);
    toIntent(context: Context, session: CustomTabsSession): Intent;
    describeContents(): number;
    writeToParcel(dest: Parcel, flags: number): void;
    static readonly CREATOR: Parcelable.Creator<CustomTabsOptions>;
}
