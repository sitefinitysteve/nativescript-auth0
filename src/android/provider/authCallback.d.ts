import Dialog = android.app.Dialog;
import { AuthenticationException } from '../authentication/authenticationException';
import { Credentials } from '../../common/credentials';
export interface AuthCallback {
    onFailure(dialog: Dialog): any;
    onFailure(exception: AuthenticationException): any;
    onSuccess(credentials: Credentials): any;
}
