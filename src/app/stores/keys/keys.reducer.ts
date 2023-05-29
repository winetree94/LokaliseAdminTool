import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { KeysActions } from 'src/app/stores/keys/keys.actions';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';

export const lokaliseKeyAdapter: EntityAdapter<LokaliseKey> =
  createEntityAdapter<LokaliseKey>({
    selectId: (key) => key.key_id,
  });

const initialState: EntityState<LokaliseKey> =
  lokaliseKeyAdapter.getInitialState();

export const lokaliseKeyFeature = createFeature({
  name: 'keys',
  reducer: createReducer(
    initialState,
    on(KeysActions.set, (state, { keys }) => {
      return lokaliseKeyAdapter.setAll(keys, state);
    }),
    on(KeysActions.load, (state, { keys }) => {
      return lokaliseKeyAdapter.setAll(keys, state);
    }),
    on(KeysActions.updateMany, (state, { updates }) => {
      return lokaliseKeyAdapter.updateMany(updates, state);
    })
  ),
});
