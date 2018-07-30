import { Auth0Exception } from '../../auth0Exception';
import { ParameterizableRequest } from '../../request/parameterizableRequest';
import { BaseCallback } from '../../callback/baseCallback';
export declare class DatabaseConnectionRequest<T, U extends Auth0Exception> {
    private readonly request;
    constructor(request: ParameterizableRequest<T, U>);
    addParameters(parameters: {
        [key: string]: any;
    }): DatabaseConnectionRequest<T, U>;
    addParameter(name: string, value: any): DatabaseConnectionRequest<T, U>;
    addHeader(name: string, value: string): DatabaseConnectionRequest<T, U>;
    setConnection(connection: string): DatabaseConnectionRequest<T, U>;
    start(callback: BaseCallback<T, U>): void;
}
