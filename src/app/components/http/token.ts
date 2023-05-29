import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { SettingsSelectors } from 'src/app/stores/settings/settings.selectors';
import { useTypedStore } from 'src/app/stores/typed-store';

export const USE_X_API_TOKEN = new HttpContextToken<boolean>(() => false);

export class ApiKeyNotFoundError extends Error {}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const enable = req.context.get(USE_X_API_TOKEN);

  if (!enable) {
    return next(req);
  }

  const store = useTypedStore();
  const settings = store.selectSignal(SettingsSelectors.all)();

  if (!settings.apiKey) {
    throw new ApiKeyNotFoundError('api key is not set');
  }

  const headers = req.headers
    .set('X-Api-Token', settings.apiKey)
    .set('accept', 'application/json');

  return next(
    req.clone({
      headers,
    })
  );
};
