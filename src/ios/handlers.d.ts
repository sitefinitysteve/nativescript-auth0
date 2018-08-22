import { Response } from './response';
import { AuthenticationError } from './authenticationError';
import { Result } from './result';
import { JSONObjectPayload } from '../common/jsonObjectPayload';
export declare function plainJson(response: Response<AuthenticationError>, callback: (result: Result<{
    [key: string]: any;
}>) => void): void;
export declare function authenticationObject<T>(TClass: JSONObjectPayload<T>): (response: Response<AuthenticationError>, callback: (result: Result<T>) => void) => void;
export declare function noBody(response: Response<AuthenticationError>, callback: (result: Result<void>) => void): void;
