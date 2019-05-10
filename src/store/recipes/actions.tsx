import {SEARCH, REFRESH, UPDATE, ONE} from './types';
import {recipeInterface} from '../';

export function Search(search: string) {
    return {
        type: SEARCH,
        payload: search
    }
}

export function Refresh(recipes: recipeInterface[]) {
    return {
        type: REFRESH,
        payload: recipes
    }
}

export function Update(recipes: recipeInterface) {
    return {
        type: UPDATE,
        payload: recipes
    }
}

export function One(url: string) {
    return {
        type: ONE,
        payload: url
    }
}
