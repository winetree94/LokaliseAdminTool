import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatestWith, map } from 'rxjs';
import { KeysActions } from 'src/app/stores/keys/keys.actions';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';
import { KeysSelectors } from 'src/app/stores/keys/keys.selectors';
import { useTypedStore } from 'src/app/stores/typed-store';

@Injectable()
export class LokaliseKeysEffects {
  private readonly _store = useTypedStore();
  private readonly _actions = inject(Actions);

  private static STORAGE_KEY = 'keys';

  public syncWithStorage = createEffect(() => {
    return this._actions.pipe(
      ofType(KeysActions.set, KeysActions.load),
      combineLatestWith(this._store.select(KeysSelectors.all)),
      map(([, keys]) => {
        localStorage.setItem(
          LokaliseKeysEffects.STORAGE_KEY,
          JSON.stringify(keys)
        );
        return KeysActions.storageEnd();
      })
    );
  });

  public constructor() {
    const rawValue = localStorage.getItem(LokaliseKeysEffects.STORAGE_KEY);
    if (!rawValue) {
      return;
    }
    try {
      const keys = JSON.parse(rawValue) as LokaliseKey[];
      this._store.dispatch(
        KeysActions.set({
          keys: keys,
        })
      );
    } catch (error) {
      console.warn('Failed to parse preferences from localStorage');
    }
  }
}
