export function initalize(): void;
export function show(): Promise<any>;
export function showIdp(): Promise<any>;
export function refreshTokenWithId(tokenId: string): Promise<any>;
export function refreshTokenWithRefreshToken(refreshId: string): Promise<any>;
export function isTokenExpired(token: string): boolean;
export function decodeToken(token: string): string;
export function addParameter(key: string, value: string): Promise<any>;
export function addScopeParameter(scope: any): Promise<any>;

/*export function initalize(options: InitalizeOptions): void;
export function logEvent(options: LogEventOptions): void;
export function logView(viewName: string): void;
export function dispatch(): void;
export function logException(options: LogExceptionOptions): void;
export function logException(description: string): void;
export function startTimer(timerName: string, options: StartTimerOptions): void;
export function stopTimer(timerName: string): void;
export function logTimingEvent(options: LogTimingEventOptions): void;
export function getTracker(): string;*/

interface Credentials{
    getAccessToken(): string;
    getIdToken(): string;
    getRefreshToken(): string;
    getType(): string;
}