import {SEARCH_RECIPES, REFRESH_RECIPES} from './types';
import {recipeInterface} from '../';

export function SearchRecipes(search: string) {
    return {
        type: SEARCH_RECIPES,
        payload: search
    }
}

export function RefreshRecipes(recipes: recipeInterface[]) {
    return {
        type: REFRESH_RECIPES,
        payload: recipes
    }
}
