declare module android {
    export module support {
        export module customtabs {
            export class CustomTabsClient {
                public warmup(param0: number);
                public newSession(param0: string): CustomTabsSession;

                public static bindCustomTabsService(context: android.content.Context, package: string, serviceConnection: CustomTabsServiceConnection)
            }
            export abstract class CustomTabsServiceConnection extends android.content.ServiceConnection { }
            export class CustomTabsSession { }
            export class CustomTabsIntent {
                public intent: android.content.Intent;
            }
            export module CustomTabsIntent {
                export class Builder {
                    constructor(session: CustomTabsSession);
                    public setShowTitle(showTitle: boolean): Builder;
                    public setToolbarColor(toolbarColor: number): Builder;
                    public build(): CustomTabsIntent;
                }
            }
        }
    }
}