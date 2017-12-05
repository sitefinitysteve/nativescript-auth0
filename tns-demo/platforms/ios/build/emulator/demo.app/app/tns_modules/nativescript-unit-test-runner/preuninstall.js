"use strict";
var fs = require("fs");
var hookHelper = require("./lib/hook-helper");
var hookPath = hookHelper.getHookFilePath();
if (fs.existsSync(hookPath)) {
    fs.unlinkSync(hookPath);
}
