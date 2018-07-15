import { Response } from './response';
import { AuthenticationError } from './authenticationError';
import { Result } from './result';
import { JSONObjectPayload } from './jsonObjectPayload';
import { HttpResponseEncoding } from 'tns-core-modules/http/http';
import { emptyBodyError, Auth0Error } from './auth0Error';
import { DatabaseUser } from './authentication';

export function plainJson(response: Response<AuthenticationError>, callback: (result: Result<{ [key: string]: any }>) => void) {
    try {
        const dictionary = response.result() as { [key: string]: any };
        if (dictionary != null) {
            callback({
                success: dictionary
            });
        } else {
            callback({
                failure: new AuthenticationError(response.data.toString(HttpResponseEncoding.UTF8))
            });
        }
    } catch (error) {
        callback({
            failure: error
        });
    }
}

export function authenticationObject<T>(TClass: JSONObjectPayload<T>) {
    return (response: Response<AuthenticationError>, callback: (result: Result<T>) => void) => {
        try {
            const dictionary = response.result() as { [key: string]: any };
            const object = (dictionary != null) ? TClass.initWithJson(dictionary) : undefined;
            if (object != null) {
                callback({
                    success: object
                });
            } else {
                callback({
                    failure: new AuthenticationError(response.data.toString(HttpResponseEncoding.UTF8))
                });
            }
        } catch (error) {
            callback({
                failure: error
            });
        }
    };
}

export function databaseUser(response: Response<AuthenticationError>, callback: (result: Result<DatabaseUser>) => void) {
    try {
        const dictionary = response.result() as { [key: string]: any };
        const email = dictionary["email"];
        if (email != null) {
            const username = dictionary["username"];
            const verifiedRaw = dictionary["email_verified"];
            let verified: boolean = false;
            if (verifiedRaw != null) {
                verified = verifiedRaw === 'true';
            }
            callback({
                success: { email, username, verified }
            });
        } else {
            callback({
                failure: new AuthenticationError(response.data.toString(HttpResponseEncoding.UTF8))
            });
        }
    } catch (error) {
        callback({
            failure: error
        });
    }
}

export function noBody(response: Response<AuthenticationError>, callback: (result: Result<void>) => void) {
    try {
        const _ = response.result();
        callback({
            success: true as undefined
        });
    } catch (error) {
        if (error instanceof Auth0Error && error.code === emptyBodyError) {
            callback({
                success: true as undefined
            });
        } else {
            callback({
                failure: error
            });
        }
    }
}
