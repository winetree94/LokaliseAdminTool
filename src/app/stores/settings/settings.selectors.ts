import { createFeatureSelector } from '@ngrx/store';
import { Settings } from 'src/app/stores/settings/settings.model';
import { settingFeature } from 'src/app/stores/settings/settings.reducer';

const self = createFeatureSelector<Settings>(settingFeature.name);

export const SettingsSelectors = {
  all: self,
};
