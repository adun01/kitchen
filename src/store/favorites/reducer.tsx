import {KtnRecipeShortModel} from '../../models/recipe/short';

import {KtnFavoritesStore} from './';

let favorites: KtnRecipeShortModel[] = [];

if (localStorage.getItem('favorites')) {
    favorites = JSON.parse(localStorage.getItem('favorites') || '')
        .map((favorite: string): KtnRecipeShortModel => new KtnRecipeShortModel(favorite));
}

export function KtnFavoriteReducer(state: KtnFavoritesStore = new KtnFavoritesStore(favorites), action: any): KtnFavoritesStore {
    switch (action.type) {
        default:
            return state;
    }
}
