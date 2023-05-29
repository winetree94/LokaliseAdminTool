import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { settingFeature } from 'src/app/stores/settings/settings.reducer';
import { SettingsEffects } from 'src/app/stores/settings/settings.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      [settingFeature.name]: settingFeature.reducer,
    }),
    provideEffects([
      SettingsEffects,
    ]),
    provideRouterStore(),
  ],
};
