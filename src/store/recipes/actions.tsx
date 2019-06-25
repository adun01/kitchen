import {LIST_SEARCH, LIST_SUCCESS, ONE_GET, ONE_SUCCESS} from './types';

import {KtnRecipeModel} from '../../models/recipe';

export function GetList(search: string) {
    return {
        type: LIST_SEARCH,
        payload: search
    }
}

export function ListSuccess(recipes: KtnRecipeModel[]) {
    return {
        type: LIST_SUCCESS,
        payload: recipes
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
