import { Injectable } from "@angular/core";
import { SettingsActions } from "src/app/stores/settings/settings.actions";
import { Settings } from "src/app/stores/settings/settings.model";
import { useTypedStore } from "src/app/stores/typed-store";

@Injectable()
export class SettingsEffects {
  private readonly _store = useTypedStore();


  public constructor() {
    const rawValue = localStorage.getItem('settings');
    if (!rawValue) {
      return;
    }
    try {
      const settings = JSON.parse(rawValue) as Settings;
      this._store.dispatch(
        SettingsActions.set({
          settings: settings,
        }),
      );
    } catch (error) {
      console.warn('Failed to parse preferences from localStorage');
    }
  }

}
