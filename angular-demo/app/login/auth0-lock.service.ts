import { Injectable } from '@angular/core';
import { Auth0Lock } from 'nativescript-auth0';

@Injectable()
export class Auth0LockService {

  private lock: Auth0Lock;

  constructor() {
    this.lock = new Auth0Lock({
      clientId: 'q5atQzi6DgmWBpHWRJbd7MBNa5eLBPRp',
      domain: 'nativescript.auth0.com',
      //scope: ["offline_access openid"]
    });
  }

  public getLock() {
    return this.lock;
  }

}
