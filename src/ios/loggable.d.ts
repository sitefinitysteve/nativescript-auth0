import { Logger } from './logger';
export interface Loggable {
    logger: Logger | undefined;
}
export declare class LoggableExtension {
    static using(loggable: Loggable, logger: Logger): Loggable;
    static logging(loggable: Loggable, enabled: boolean): Loggable;
}
