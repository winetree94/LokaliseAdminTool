import { EntityState } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';
import {
  lokaliseKeySnapshotAdapter,
  lokaliseKeySnapshotFeature,
} from './keys-snapshot.reducer';

const selectors = lokaliseKeySnapshotAdapter.getSelectors();

const self = createFeatureSelector<EntityState<LokaliseKey>>(
  lokaliseKeySnapshotFeature.name
);

const all = createSelector(self, selectors.selectAll);

const entities = createSelector(self, selectors.selectEntities);

const count = createSelector(self, selectors.selectTotal);

const ids = createSelector(self, selectors.selectIds);

export const KeysSnapshotSelectors = {
  all,
  entities,
  count,
  ids,
};
