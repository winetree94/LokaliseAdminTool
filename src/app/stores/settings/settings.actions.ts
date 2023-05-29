import { createAction, props } from '@ngrx/store';
import { Settings } from 'src/app/stores/settings/settings.model';

const set = createAction('[Settings] Set', props<{ settings: Settings }>());

const storageEnd = createAction('[Settings] Storage End');

export const SettingsActions = {
  set,
  storageEnd,
};
