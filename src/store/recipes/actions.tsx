import {LIST_SEARCH, LIST_SUCCESS, ONE_GET, ONE_SUCCESS, REFRESH} from './types';

import {KtnRecipeModel} from '../../models/recipe';
import {KtnRecipeShortModel} from '../../models/recipe/short';

export function GetList(search: string) {
    return {
        type: LIST_SEARCH,
        payload: search
    }
}

export function ListSuccess(recipes: KtnRecipeShortModel[]) {
    return {
        type: LIST_SUCCESS,
        payload: recipes
    }
}

export function Refresh(recipe: KtnRecipeShortModel) {
    return {
        type: REFRESH,
        payload: recipe
    }
}

export function GetOne(url: string) {
    return {
        type: ONE_GET,
        payload: url
    }
}

export function SuccessOne(recipe: KtnRecipeModel) {
    return {
        type: ONE_SUCCESS,
        payload: recipe
    }
}
