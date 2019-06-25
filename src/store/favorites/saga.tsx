import {select, call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import {KtnRecipeShortModel, KtnRecipeModel} from '../../models/recipe';

import {Add, Remove} from './actions';
import {ADD, REMOVE} from './types';

function getFavoritesFromLocationStore(): KtnRecipeShortModel[] {
    const favorites: string | null = localStorage.getItem('favorites');
    if (favorites) {
        return JSON.parse(favorites).map((favorite: any) => new KtnRecipeShortModel(favorite));
    }
    return [];
}

function setFavoritesToLocationStore(favorites: KtnRecipeShortModel[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function* AddToFavorite(action: any) {
    const state = yield select();
    const favorites: KtnRecipeShortModel[] = getFavoritesFromLocationStore();

    favorites.push({
        ...action.payload,
        isFavorite: true
    });

    setFavoritesToLocationStore(favorites);

    const recipe: KtnRecipeShortModel = state.recipes.shortList.find((recipe: KtnRecipeShortModel): boolean => recipe.id === action.payload.id);

    yield put(Add(recipe));
}

function* RemoveToFavorite(action: any) {
    const state = yield select();

    const favorites: KtnRecipeShortModel[] = getFavoritesFromLocationStore()
        .filter((recipe: KtnRecipeShortModel): boolean => recipe.id !== action.payload.id);

    setFavoritesToLocationStore(favorites);

    yield put(Remove(action.payload));

    const recipe: KtnRecipeModel = state.recipes.find((recipe: KtnRecipeModel) => recipe.id === action.payload.id);
}

export function* favoriteSaga() {
    yield takeEvery(ADD, AddToFavorite);
    yield takeEvery(REMOVE, RemoveToFavorite);
}
