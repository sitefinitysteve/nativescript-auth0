import { Auth0Exception } from '../../auth0Exception';
import { ParameterizableRequest } from '../../request/parameterizableRequest';
import { BaseCallback } from '../../callback/baseCallback';
/**
 * Request to perform a non-authentication related action
 * like creating a user or requesting a change password
 */
export declare class DatabaseConnectionRequest<T, U extends Auth0Exception> {
    private readonly request;
    constructor(request: ParameterizableRequest<T, U>);
    /**
     * Add the given parameters to the request
     * @param parameters to be sent with the request
     * @return itself
     */
    addParameters(parameters: {
        [key: string]: any;
    }): DatabaseConnectionRequest<T, U>;
    /**
     * Add a parameter by name to the request
     * @param name of the parameter
     * @param value of the parameter
     * @return itself
     */
    addParameter(name: string, value: any): DatabaseConnectionRequest<T, U>;
    /**
     * Add a header for request: the, e.g. "Authorization"
     * @param name of the header
     * @param value of the header
     * @return itself
     */
    addHeader(name: string, value: string): DatabaseConnectionRequest<T, U>;
    /**
     * Set the Auth0 Database Connection used for this request using its name.
     * @param connection name
     * @return itself
     */
    setConnection(connection: string): DatabaseConnectionRequest<T, U>;
    /**
     * Executes the request async and returns its results via callback
     * @param callback called on success or failure of the request
     */
    start(callback: BaseCallback<T, U>): void;
}
