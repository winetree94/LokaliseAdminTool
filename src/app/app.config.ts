import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { settingFeature } from 'src/app/stores/settings/settings.reducer';
import { SettingsEffects } from 'src/app/stores/settings/settings.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from 'src/app/components/http/token';
import { LokaliseKeysEffects } from 'src/app/stores/keys/keys.effects';
import { lokaliseKeyFeature } from 'src/app/stores/keys/keys.reducer';
import { lokaliseKeySnapshotFeature } from './stores/keys-snapshot/keys-snapshot.reducer';
import { LokaliseKeysSnapshotEffects } from './stores/keys-snapshot/keys-snapshot.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: true || !isDevMode() }),
    provideStore(
      {
        [settingFeature.name]: settingFeature.reducer,
        [lokaliseKeyFeature.name]: lokaliseKeyFeature.reducer,
        [lokaliseKeySnapshotFeature.name]: lokaliseKeySnapshotFeature.reducer,
      },
      {
        metaReducers:
          true || isDevMode()
            ? [
                (reducer) => (state, action) => {
                  console.debug(
                    `%c${action.type}`,
                    'background: #222; color: #bada55'
                  );
                  return reducer(state, action);
                },
              ]
            : [],
      }
    ),
    provideEffects([
      SettingsEffects,
      LokaliseKeysEffects,
      LokaliseKeysSnapshotEffects,
    ]),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouterStore(),
    provideAnimations(),
  ],
};
