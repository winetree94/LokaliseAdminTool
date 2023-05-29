import { createAction, props } from "@ngrx/store";
import { Settings } from "src/app/stores/settings/settings.model";

const set = createAction(
  '[Settings] Set',
  props<{ settings: Settings }>(),
);

export const SettingsActions = {
  set,
};
