declare namespace android {
    export namespace support {
        export namespace customtabs {
            export class CustomTabsClient extends java.lang.Object {
                public warmup(param0: number);
                public newSession(param0: string): CustomTabsSession;

                public static bindCustomTabsService(context: android.content.Context, package: string, serviceConnection: CustomTabsServiceConnection);
            }
            export abstract class CustomTabsServiceConnection extends android.content.ServiceConnection { }
            export class CustomTabsSession extends java.lang.Object { }
            export class CustomTabsIntent extends java.lang.Object {
                public intent: android.content.Intent;
            }
            export namespace CustomTabsIntent {
                export class Builder extends java.lang.Object {
                    constructor(session: CustomTabsSession);
                    public setShowTitle(showTitle: boolean): Builder;
                    public setToolbarColor(toolbarColor: number): Builder;
                    public build(): CustomTabsIntent;
                }
            }
        }
    }
}
