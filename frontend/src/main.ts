import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { API_URL, environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log(API_URL);

platformBrowserDynamic().bootstrapModule(AppModule);
