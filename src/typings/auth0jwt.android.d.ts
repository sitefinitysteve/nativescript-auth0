declare module com {
    export module auth0 {
        export module android {
            export module jwt {
                export class Claim extends java.lang.Object {
                    public asString(): string;
                }
                export class DecodeException extends java.lang.Exception {}
                export class JWT extends java.lang.Object {
                    constructor(token: string);
                    public getClaim(claimName: string): Claim;
                }
            }
        }
    }
}