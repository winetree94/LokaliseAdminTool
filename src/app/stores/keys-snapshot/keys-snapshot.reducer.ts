import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';
import { KeysSnapshotActions } from './keys-snapshot.actions';

export const lokaliseKeySnapshotAdapter: EntityAdapter<LokaliseKey> =
  createEntityAdapter<LokaliseKey>({
    selectId: (key) => key.key_id,
  });

const initialState: EntityState<LokaliseKey> =
  lokaliseKeySnapshotAdapter.getInitialState();

export const lokaliseKeySnapshotFeature = createFeature({
  name: 'keys-snapshot',
  reducer: createReducer(
    initialState,
    on(KeysSnapshotActions.snapshot, (state, { keys }) => {
      return lokaliseKeySnapshotAdapter.setAll(keys, state);
    })
  ),
});
