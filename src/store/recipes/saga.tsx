import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';

import {LIST_SEARCH, ONE_GET} from './types';
import {ListSuccess, SuccessOne} from './actions';
import {KtnShortRecipeStore} from "./index";

import {KtnRecipeModel} from '../../models/recipe';
import {getState, KtnRecipeShortModel} from "../../models/recipe/short";

import {getStorage} from "../../utils";

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
    const store: KtnShortRecipeStore = yield select(getState);
    const existNewRecipe: boolean = rawRecipes.some((rawRecipe: any) => !store.list
        .find((recipe: KtnRecipeShortModel) => rawRecipe.id === recipe.id));
    if (1) {
        const favorites = getStorage('favorites');
        const newRecipes: KtnRecipeShortModel[] = rawRecipes.map((rawRecipe: any): KtnRecipeShortModel => {
            return store.list.find((recipe: KtnRecipeShortModel) => rawRecipe.id === recipe.id)
                || new KtnRecipeShortModel({
                    ...rawRecipe,
                    isFavorite: favorites.includes(rawRecipe.id)
                });
        });
        yield put(ListSuccess(newRecipes));
    }
}

function* OneRecipe(action: any) {
    const recipe = yield call(oneRecipe, action.payload);
    yield put(SuccessOne(new KtnRecipeModel(recipe)));
}

export function* recipeSaga() {
    yield takeLatest(LIST_SEARCH, SearchRecipes);
    yield takeEvery(ONE_GET, OneRecipe);
}
