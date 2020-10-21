export declare class ResponseType {
    readonly rawValue: number;
    constructor(rawValue: number);
    static readonly token: ResponseType;
    static readonly idToken: ResponseType;
    static readonly code: ResponseType;
    get label(): string | null;
}
