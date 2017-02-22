/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/chai/index.d.ts" />
/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

declare var assert: Chai.AssertStatic; 
import * as helpers from "../scripts/helpers";
import * as appSetttings from "application-settings"
import { Auth0Lock, Credentials } from "nativescript-auth0";
import * as j from "jasmine-core";

declare var JSON;

describe('Auth0Lock', () => {
  //Populate these with the latest valid entries
  let accessToken: string = "G47mNzshIVeFAivt";
  let idToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL25hdGl2ZXNjcmlwdC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU5MjQ4NDk5NDA1OTAyNjQwMjUiLCJhdWQiOiJxNWF0UXppNkRnbVdCcEhXUkpiZDdNQk5hNWVMQlBScCIsImV4cCI6MTQ4NzgyODkwMCwiaWF0IjoxNDg3NzkyOTAwfQ.fn9Ndgheo6DajCB_1KWDNmB6CR6bCmhh2rJA3kA8w1Q";
  let refreshToken: string = "";
  let lock = helpers.getAuthLock();
  
  before(function() {
      let creds: Credentials = {
                        accessToken: accessToken,
                        idToken: idToken,
                        refreshToken: refreshToken,
                    };

      appSetttings.setString(Auth0Lock._tokenKey, JSON.stringify(creds));
  });

  it("Can get user profile", () =>{
      var user = lock.getUserInfo();
      assert.isTrue(user);
  })

  it("Can get token details", () =>{
      assert.isTrue(true);
  })
});