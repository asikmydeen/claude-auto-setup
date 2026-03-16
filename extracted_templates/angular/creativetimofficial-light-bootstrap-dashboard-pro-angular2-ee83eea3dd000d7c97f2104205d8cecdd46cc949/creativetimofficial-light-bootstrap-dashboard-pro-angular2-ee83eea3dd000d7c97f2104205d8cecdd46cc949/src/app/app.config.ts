import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { AppRoutes } from './app.routing';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),  provideRouter(AppRoutes, withHashLocation()), provideClientHydration()]
};
