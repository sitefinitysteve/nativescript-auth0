// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "@nativescript/angular";

import { AppModule } from "./app/app.module";
import { setupAuth0 }  from './app/auth0/auth0-setup';

setupAuth0();

platformNativeScriptDynamic().bootstrapModule(AppModule);
