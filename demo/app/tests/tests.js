var Auth0 = require("nativescript-auth0").Auth0;
var auth0 = new Auth0();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(auth0.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(auth0.functionname()).toEqual(jasmine.any(Promise));
  });
});