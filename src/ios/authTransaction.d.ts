export interface AuthTransaction {
    readonly state?: string;
    resume(url: NSURL, options: NSDictionary<string, any>): boolean;
    cancel(): any;
}
