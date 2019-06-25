import {createStore, applyMiddleware} from 'redux';
import {fork, all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import {KtnActivaterModel} from '../models';

import {KtnRecipeStore} from './recipes/';
import {KtnFavoritesStore} from './favorites/';
import {KtnFiltersStore} from './filters/';
import {KtnRecipeReducer} from './recipes/reducer';
import {KtnFavoriteReducer} from './favorites/reducer';

import {LIST_SUCCESS} from './recipes/types';

import {recipeSaga} from './recipes/saga';
import {favoriteSaga} from './favorites/saga';

const sagaMiddleware = createSagaMiddleware();

export class KtnCommonStore {
    public recipes: KtnRecipeStore;
    public favorites: KtnFavoritesStore;
    public filters: KtnFiltersStore;

    constructor(recipes: KtnRecipeStore,
                favorites: KtnFavoritesStore,
                filters: KtnFiltersStore) {
        this.recipes = recipes;
        this.favorites = favorites;
        this.filters = filters;
    }
}

export const store = createStore((state: KtnCommonStore = new KtnCommonStore(
    new KtnRecipeStore,
    new KtnFavoritesStore,
    new KtnFiltersStore), action: any): KtnCommonStore => {
    switch (action.type) {
        case LIST_SUCCESS:
            return {
                ...state,
                recipes: KtnRecipeReducer(state.recipes, action)
            }
            break;
        /*case REFRESH_FAVORITES:
            //KtnFavoriteReducer
            return state;
            break;*/
        default:
            return state;
            break;

    }
}, applyMiddleware(sagaMiddleware));

KtnActivaterModel(store);

function* rootSaga() {
    yield all([
        fork(recipeSaga),
        fork(favoriteSaga),
    ]);
}

sagaMiddleware.run(rootSaga);
