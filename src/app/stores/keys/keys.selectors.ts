import { EntityState } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {
  lokaliseKeyAdapter,
  lokaliseKeyFeature,
} from 'src/app/stores/keys/keys.reducer';
import { LokaliseKey } from 'src/app/stores/keys/keys.model';

const selectors = lokaliseKeyAdapter.getSelectors();

const self = createFeatureSelector<EntityState<LokaliseKey>>(
  lokaliseKeyFeature.name
);

const all = createSelector(self, selectors.selectAll);

const entities = createSelector(self, selectors.selectEntities);

const count = createSelector(self, selectors.selectTotal);

const ids = createSelector(self, selectors.selectIds);

export const KeysSelectors = {
  all,
  entities,
  count,
  ids,
};
