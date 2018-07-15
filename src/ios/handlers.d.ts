import { Response } from './response';
import { AuthenticationError } from './authenticationError';
import { Result } from './result';
import { JSONObjectPayload } from './jsonObjectPayload';
import { DatabaseUser } from './authentication';
export declare function plainJson(response: Response<AuthenticationError>, callback: (result: Result<{
    [key: string]: any;
}>) => void): void;
export declare function authenticationObject<T>(TClass: JSONObjectPayload<T>): (response: Response<AuthenticationError>, callback: (result: Result<T>) => void) => void;
export declare function databaseUser(response: Response<AuthenticationError>, callback: (result: Result<DatabaseUser>) => void): void;
export declare function noBody(response: Response<AuthenticationError>, callback: (result: Result<void>) => void): void;
