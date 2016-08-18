export function initalize(): void;
export function show(): Promise<T>;
export function showIdp(): Promise<T>;
export function refreshTokenWithId(tokenId: string): Promise<T>;
export function refreshTokenWithRefreshToken(refreshId: string): Promise<T>;
export function isTokenExpired(token: string): boolean;
export function decodeToken(token: string): string;
export function addParameter(key: string, value: string): Promise<T>;
export function addScopeParameter(scope: any): Promise<T>;

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