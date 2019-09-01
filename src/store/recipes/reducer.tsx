import {KtnRecipeStore, KtnShortRecipeStore} from './';
import {LIST_SUCCESS, ONE_SUCCESS, REFRESH} from './types';
import {KtnRecipeShortModel} from "../../models/recipe/short";

import {getStorage, setStorage} from "../../utils";

const updateStorage = (recipe: KtnRecipeShortModel): void => {
    const ids = new Set(getStorage('favorites'));
    if (recipe.isFavorite) {
        ids.add(recipe.id);
    } else {
        ids.delete(recipe.id);
    }
    setStorage('favorites', Array.from(ids));
};

export function KtnRecipeReducer(state: KtnRecipeStore = new KtnRecipeStore, action: any): KtnRecipeStore {
    switch (action.type) {
        case ONE_SUCCESS:
            state.list.push(action.payload);
            return {
                ...state,
                list: state.list
            };
        default:
            return state;
    }
}

export function KtnShortRecipeReducer(state: KtnShortRecipeStore = new KtnShortRecipeStore, action: any): KtnShortRecipeStore {
    switch (action.type) {
        case LIST_SUCCESS:
            return {
                ...state,
                list: action.payload
            };
        case REFRESH:
            updateStorage(action.payload);
            const list = state.list.map((recipe: KtnRecipeShortModel): KtnRecipeShortModel => {
                if (recipe.id === action.payload.id) {
                    return action.payload;
                }
                return recipe;
            });
            return {
                ...state,
                list: list
            };

        default:
            return state;
    }
}
