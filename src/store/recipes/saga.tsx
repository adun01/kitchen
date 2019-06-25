import {select, call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import {KtnRecipeModel, KtnRecipeShortModel} from '../../models/recipe';

import {LIST_SEARCH, ONE_GET} from '../recipes/types';
import {ListSuccess, SuccessOne} from '../recipes/actions';

function getRecipes(query: string) {
    return fetch('/api/search' + query)
        .then(response => response.json());
}

function oneRecipe(name: string) {
    return fetch('/api/recipes/' + name)
        .then(response => response.json());
}

function* SearchRecipes(action: any) {
    const rawRecipes = yield call(getRecipes, action.payload);
    const state = yield select();
    const recipes = rawRecipes.map((recipe: any): KtnRecipeModel => new KtnRecipeModel(recipe));
    yield put(ListSuccess(recipes));
}

function* OneRecipe(action: any) {
    const recipe = yield call(oneRecipe, action.payload);
    yield put(SuccessOne(new KtnRecipeModel(recipe)));
}

export function* recipeSaga() {
    yield takeLatest(LIST_SEARCH, SearchRecipes);
    yield takeEvery(ONE_GET, OneRecipe);
}
