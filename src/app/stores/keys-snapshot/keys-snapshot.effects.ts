import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { KeysActions } from 'src/app/stores/keys/keys.actions';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';
import { useTypedStore } from 'src/app/stores/typed-store';
import { KeysSnapshotActions } from './keys-snapshot.actions';

@Injectable()
export class LokaliseKeysSnapshotEffects {
  private readonly _store = useTypedStore();
  private readonly _actions = inject(Actions);

  private static STORAGE_KEY = 'keys-snapshot';

  public readonly onload = createEffect(() => {
    return this._actions.pipe(
      ofType(KeysActions.load),
      map((action) =>
        KeysSnapshotActions.snapshot({
          keys: action.keys,
        })
      )
    );
  });

  public syncWithStorage = createEffect(() => {
    return this._actions.pipe(
      ofType(KeysSnapshotActions.snapshot),
      map((action) => {
        console.log('saved');
        localStorage.setItem(
          LokaliseKeysSnapshotEffects.STORAGE_KEY,
          JSON.stringify(action.keys)
        );
        return KeysSnapshotActions.storageEnd();
      })
    );
  });

  public constructor() {
    const rawValue = localStorage.getItem(
      LokaliseKeysSnapshotEffects.STORAGE_KEY
    );
    if (!rawValue) {
      return;
    }
    try {
      const keys = JSON.parse(rawValue) as LokaliseKey[];
      this._store.dispatch(
        KeysSnapshotActions.snapshot({
          keys: keys,
        })
      );
    } catch (error) {
      console.warn('Failed to parse preferences from localStorage');
    }
  }
}
