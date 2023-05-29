import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatestWith, map } from 'rxjs';
import { SettingsActions } from 'src/app/stores/settings/settings.actions';
import { Settings } from 'src/app/stores/settings/settings.model';
import { SettingsSelectors } from 'src/app/stores/settings/settings.selectors';
import { useTypedStore } from 'src/app/stores/typed-store';

@Injectable()
export class SettingsEffects {
  private readonly _store = useTypedStore();
  private readonly _actions = inject(Actions);

  private static STORAGE_KEY = 'settings';

  public syncWithStorage = createEffect(() => {
    return this._actions.pipe(
      ofType(SettingsActions.set),
      combineLatestWith(this._store.select(SettingsSelectors.all)),
      map(([, perferences]) => {
        localStorage.setItem(
          SettingsEffects.STORAGE_KEY,
          JSON.stringify(perferences)
        );
        return SettingsActions.storageEnd();
      })
    );
  });

  public constructor() {
    const rawValue = localStorage.getItem(SettingsEffects.STORAGE_KEY);
    if (!rawValue) {
      return;
    }
    try {
      const settings = JSON.parse(rawValue) as Settings;
      this._store.dispatch(
        SettingsActions.set({
          settings: settings,
        })
      );
    } catch (error) {
      console.warn('Failed to parse preferences from localStorage');
    }
  }
}
