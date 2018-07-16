var Auth0 = require("nativescript-auth0").Auth0;
var auth0 = new Auth0();

describe("greet function", function() {
    it("exists", function() {
        expect(auth0.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(auth0.greet()).toEqual("Hello, NS");
    });
});