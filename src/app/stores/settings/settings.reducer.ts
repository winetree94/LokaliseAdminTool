import { createFeature, createReducer, on } from '@ngrx/store';
import { Settings  } from './settings.model';
import { SettingsActions } from 'src/app/stores/settings/settings.actions';

const initialState: Settings = {
  xApiKey: '',
};

export const settingFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(SettingsActions.set, (state, { settings }) => ({
      ...state,
      ...settings,
    })),
  ),
});
