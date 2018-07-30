import { AuthenticationException } from '../authenticationException';
import { Request } from '../../request/request';
import { Authentication } from '../../result/authentication';
import { AuthenticationRequest } from '../../request/authenticationRequest';
import { ParameterizableRequest } from '../../request/parameterizableRequest';
import { UserInfo } from '../../../common/userInfo';
import { BaseCallback } from '../../callback/baseCallback';
export declare class ProfileRequest implements Request<Authentication, AuthenticationException> {
    private static readonly HEADER_AUTHORIZATION;
    private readonly credentialsRequest;
    private readonly userInfoRequest;
    constructor(credentialsRequest: AuthenticationRequest, userInfoRequest: ParameterizableRequest<UserInfo, AuthenticationException>);
    addParameters(parameters: {
        [key: string]: any;
    }): ProfileRequest;
    setScope(scope: string): ProfileRequest;
    start(callback: BaseCallback<Authentication, AuthenticationException>): void;
}
