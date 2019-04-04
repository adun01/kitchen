import {Action} from 'redux';
import {select, call, put, takeLatest, takeEvery} from 'redux-saga/effects'

import {stateInterface, recipeShortInterface, recipeInterface} from '../';

import {SEARCH} from '../recipes/types';
import {Refresh, Update} from '../recipes/actions';

import {ADD, REMOVE} from '../favorites/types';
import {
    Add as AddToFavoriteAction,
    Remove as RemoveToFavoriteAction,
    Refresh as RefreshFavorites
} from '../favorites/actions';

function getRecipes(query: string) {
    return fetch('/api/search' + query)
        .then(response => response.json());
}

export interface actionSearchInterface extends Action {
    payload: string
}

export interface actionFavoriteActionInterface extends Action {
    payload: recipeShortInterface
}

function* SearchRecipes(action: actionSearchInterface) {
    let recipes = yield call(getRecipes, action.payload);
    const state = yield select();
    recipes = recipes.map((recipe: recipeInterface): recipeInterface => {
        if (state.favorites.find((shortRecipe: recipeShortInterface): boolean => recipe.id === shortRecipe.id)) {
            recipe.isFavorite = true;
        }
        return recipe;
    });

    yield put(Refresh(recipes));
}

function getFavoritesFromLocationStore(): recipeShortInterface[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function setFavoritesFromLocationStore(favorites: recipeShortInterface[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function* AddToFavorite(action: actionFavoriteActionInterface) {
    const state = yield select();
    const favorites: recipeShortInterface[] = getFavoritesFromLocationStore();
    favorites.push({
        id: action.payload.id,
        name: action.payload.name
    });
    setFavoritesFromLocationStore(favorites);
    yield put(RefreshFavorites(favorites));
    const recipe = state.recipes.find((recipe: recipeInterface) => recipe.id === action.payload.id);
    yield put(Update({
        ...recipe,
        isFavorite: true
    }));
}

function* RemoveToFavorite(action: actionFavoriteActionInterface) {
    const state = yield select();
    let favorites: recipeShortInterface[] = getFavoritesFromLocationStore();
    favorites = favorites.filter((recipe: recipeShortInterface) => recipe.id !== action.payload.id);
    setFavoritesFromLocationStore(favorites);
    yield put(RefreshFavorites(favorites));
    const recipe = state.recipes.find((recipe: recipeInterface) => recipe.id === action.payload.id);
    yield put(Update({
        ...recipe,
        isFavorite: false
    }));
}

function* rootSaga() {
    yield takeLatest(SEARCH, SearchRecipes);
    yield takeEvery(ADD, AddToFavorite);
    yield takeEvery(REMOVE, RemoveToFavorite);
}

export default rootSaga;
