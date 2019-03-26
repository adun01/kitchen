import {Action} from 'redux';
import {call, put, takeLatest} from 'redux-saga/effects'

import {SEARCH_RECIPES} from '../recipes/types';
import {RefreshRecipes} from '../recipes/actions';

function getRecipes(query: string) {
    return fetch('/api/search' + query)
        .then(response => response.json());
}

export interface actionSearchInterface extends Action {
    payload: string
}

function* SearchRecipes(action: actionSearchInterface) {
    const recipes = yield call(getRecipes, action.payload);
    yield put(RefreshRecipes(recipes));
}

function* rootSaga() {
    yield takeLatest(SEARCH_RECIPES, SearchRecipes);
}

export default rootSaga;
