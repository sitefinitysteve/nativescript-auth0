declare namespace android {
    export namespace content {
        export interface ServiceConnection {
            constructor()
        }
    }
    export namespace support {
        export namespace customtabs {
            export class CustomTabsClient {
                public warmup(param0: number);
                public newSession(param0: string): CustomTabsSession;

                public static bindCustomTabsService(context: android.content.Context, package: string, serviceConnection: CustomTabsServiceConnection)
            }
            export abstract class CustomTabsServiceConnection extends android.content.ServiceConnection {
                constructor()
            }
            export class CustomTabsSession { }
            export class CustomTabsIntent {
                public intent: android.content.Intent;
            }
            export namespace CustomTabsIntent {
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