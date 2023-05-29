import { inject } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';
import { lokaliseKeyFeature } from 'src/app/stores/keys/keys.reducer';
import { Settings } from 'src/app/stores/settings/settings.model';
import { settingFeature } from 'src/app/stores/settings/settings.reducer';
import { lokaliseKeySnapshotFeature } from './keys-snapshot/keys-snapshot.reducer';

export interface RootState {
  [settingFeature.name]: Settings;
  [lokaliseKeyFeature.name]: EntityState<LokaliseKey>;
  [lokaliseKeySnapshotFeature.name]: EntityState<LokaliseKey>;
}

export const useTypedStore = (): Store<RootState> => {
  return inject(Store);
};
