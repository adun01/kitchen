import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import {LIST_SEARCH, ONE_GET} from './types';
import {ListSuccess, SuccessOne} from './actions';

import {KtnRecipeModel} from '../../models/recipe';
import {KtnRecipeShortModel} from "../../models/recipe/short";

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
    const favorites = getStorage('favorites');
    const recipes: KtnRecipeShortModel[] = rawRecipes.map((recipe: any): KtnRecipeShortModel => {
        return new KtnRecipeShortModel({
            ...recipe,
            isFavorite: recipe.id && favorites.includes(recipe.id)
        })
    });
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
