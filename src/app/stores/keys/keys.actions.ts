import { createAction, props } from '@ngrx/store';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';
import { Update } from '@ngrx/entity';

const set = createAction('[Keys] Set', props<{ keys: LokaliseKey[] }>());

const load = createAction('[Keys] Load', props<{ keys: LokaliseKey[] }>());

const storageEnd = createAction('[Keys] Storage End');

const updateMany = createAction(
  '[Keys] Update Many',
  props<{ updates: Update<LokaliseKey>[] }>()
);

export const KeysActions = {
  set,
  load,
  updateMany,
  storageEnd,
};
