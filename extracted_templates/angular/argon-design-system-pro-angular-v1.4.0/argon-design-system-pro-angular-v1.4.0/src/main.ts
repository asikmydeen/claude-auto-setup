/*!

 =========================================================
 * Argon Desing System PRO Angular - v1.4.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/argon-design-system-pro-angular
 * Copyright 2021 Creative Tim (http://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
