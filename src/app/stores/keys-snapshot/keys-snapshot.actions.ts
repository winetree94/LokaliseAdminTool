import { createAction, props } from '@ngrx/store';
import { LokaliseKey } from '../keys/keys.model';

const snapshot = createAction(
  '[KeysSnapshot] Load',
  props<{ keys: LokaliseKey[] }>()
);

const storageEnd = createAction('[KeysSnapshot] Storage End');

export const KeysSnapshotActions = {
  snapshot,
  storageEnd,
};
