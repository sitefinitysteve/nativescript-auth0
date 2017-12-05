var path = require("path");
var fs = require("fs");
module.exports = function ($platformsData, $testExecutionService) {
    if ($testExecutionService && $testExecutionService.platform) {
        var platformData = $platformsData.getPlatformData($testExecutionService.platform), projectFilesPath = path.join(platformData.appDestinationDirectoryPath, "app"), packageJsonPath = path.join(projectFilesPath, 'package.json'), packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
        packageJson.main = "./tns_modules/nativescript-unit-test-runner/app.js";
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
    }
};
