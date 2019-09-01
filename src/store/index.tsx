import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {fork, all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import {KtnBaseModel} from '../models';
import {KtnCommonReducer, KtnCommonStore} from './reducer';
export {KtnCommonStore} from './reducer';

import {KtnRecipeStore, KtnShortRecipeStore} from './recipes/';
import {KtnFavoritesStore} from './favorites/';
import {KtnFiltersStore} from './filters/';

import {recipeSaga} from './recipes/saga';
import {favoriteSaga} from './favorites/saga';
import {profilesSaga} from './profiles/saga';

import {KtnProfileStore} from "./profiles";

const sagaMiddleware = createSagaMiddleware();

export const KtnCommonStoreInstance = createStore((state: KtnCommonStore = new KtnCommonStore(
    new KtnRecipeStore,
    new KtnShortRecipeStore,
    new KtnProfileStore,
    new KtnFavoritesStore,
    new KtnFiltersStore), action: any): KtnCommonStore => {
    return KtnCommonReducer(state, action);
}, composeWithDevTools({})(applyMiddleware(sagaMiddleware)));

KtnBaseModel.setStore(KtnCommonStoreInstance);

function* rootSaga() {
    yield all([
        fork(recipeSaga),
        fork(favoriteSaga),
        fork(profilesSaga)
    ]);
}

sagaMiddleware.run(rootSaga);
