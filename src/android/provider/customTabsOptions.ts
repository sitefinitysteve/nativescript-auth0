
import Context = android.content.Context;
import Intent = android.content.Intent;
import Parcel = android.os.Parcel;
import Parcelable = android.os.Parcelable;
import CustomTabsIntent = android.support.customtabs.CustomTabsIntent;
import CustomTabsSession = android.support.customtabs.CustomTabsSession;
import ContextCompat = android.support.v4.content.ContextCompat;

/**
 * Holder for Custom Tabs customization options. Use {@link CustomTabsOptions#newBuilder()} to begin.
 */
@JavaProxy('org.nativescript.auth0.CustomTabsOptions')
@Interfaces([Parcelable])
export class CustomTabsOptions extends java.lang.Object implements Parcelable {

    private readonly showTitle: boolean;
    private readonly toolbarColor: number;

    constructor(showTitle: boolean = false, toolbarColor: number = 0) {
        super();
        this.showTitle = showTitle;
        this.toolbarColor = toolbarColor;

        return global.__native(this);
    }


    public toIntent(context: Context, session: CustomTabsSession): Intent {
        const builder: CustomTabsIntent.Builder = new CustomTabsIntent.Builder(session)
                .setShowTitle(this.showTitle);
        if (this.toolbarColor > 0) {
            // Resource exists
            builder.setToolbarColor((ContextCompat as any).getColor(context, this.toolbarColor));
        }
        return builder.build().intent;
    }

    public describeContents(): number {
        return 0;
    }

    public writeToParcel(dest: Parcel, flags: number) {
        dest.writeByte(this.showTitle ? 0x01 : 0x00);
        dest.writeInt(this.toolbarColor);
    }

    public static readonly CREATOR: Parcelable.Creator<CustomTabsOptions> = new Parcelable.Creator<CustomTabsOptions>({
        createFromParcel: function(parcel: Parcel): CustomTabsOptions {
            const showTitle = parcel.readByte() !== 0x00;
            const toolbarColor = parcel.readInt();
            return new CustomTabsOptions(showTitle, toolbarColor);
        },
        newArray: function(size: number): CustomTabsOptions[] {
            return Array.create(CustomTabsOptions, size);
        }
    });
}
