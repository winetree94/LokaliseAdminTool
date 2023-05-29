import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Settings } from 'src/app/stores/settings/settings.model';
import { settingFeature } from 'src/app/stores/settings/settings.reducer';

export interface RootState {
  [settingFeature.name]: Settings;
}

export const useTypedStore = (): Store<RootState> => {
  return inject(Store);
};
