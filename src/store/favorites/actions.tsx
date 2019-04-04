import {ADD, REMOVE, REFRESH} from './types';
import {recipeShortInterface} from '../';

export function Add(recipe: recipeShortInterface) {
    return {
        type: ADD,
        payload: recipe
    }
}

export function Remove(recipe: recipeShortInterface) {
    return {
        type: REMOVE,
        payload: recipe
    }
}

export function Refresh(recipes: recipeShortInterface[]) {
    return {
        type: REFRESH,
        payload: recipes
    }
}
