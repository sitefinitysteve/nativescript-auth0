import { Application } from '@nativescript/core';
import { setupAuth0 } from './auth0-setup';

setupAuth0();

Application.run({ moduleName: 'main-page' });
