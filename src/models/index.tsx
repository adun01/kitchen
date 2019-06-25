import {Store} from 'redux';

import {KtnCommonStore} from '../store';

import {KtnRecipeShortModel} from './recipe';
import {KtnFiltersModel} from './filters';

export function KtnActivaterModel(store: Store<KtnCommonStore>) {
    KtnRecipeShortModel.setStore(store);
    KtnFiltersModel.setStore(store);
}
