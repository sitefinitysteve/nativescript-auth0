export declare class Telemetry {
    static readonly HEADER_NAME: string;
    private static readonly NAME_KEY;
    private static readonly VERSION_KEY;
    private static readonly LIB_VERSION_KEY;
    private readonly name;
    private readonly version;
    private readonly libraryVersion;
    constructor(name: string, version: string, libraryVersion?: string);
    getName(): string;
    getVersion(): string;
    getLibraryVersion(): string | undefined;
    getValue(): string;
}
