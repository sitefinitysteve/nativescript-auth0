"use strict";
var fs = require("fs");
var os_1 = require("os");
var hookHelper = require("./lib/hook-helper");
var projectDir = hookHelper.findProjectDir();
if (projectDir) {
    var hooksDir = hookHelper.getHooksDir(), afterPrepareHookDir = hookHelper.getAfterPrepareHookDir(), content = 'module.exports = require("nativescript-unit-test-runner/lib/after-prepare");';
    if (!fs.existsSync(hooksDir)) {
        fs.mkdirSync(hooksDir);
    }
    if (!fs.existsSync(afterPrepareHookDir)) {
        fs.mkdirSync(afterPrepareHookDir);
    }
    fs.writeFileSync(hookHelper.getHookFilePath(), content + os_1.EOL);
}
