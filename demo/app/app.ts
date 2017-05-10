import * as application from "application";
import { CustomAppDelegate } from "./custom-app-delegate";

application.ios.delegate = CustomAppDelegate;

application.start(
    { 
        moduleName: "login" 
    }
);
