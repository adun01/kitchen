import {KtnRecipeShortModel} from '../../models/recipe';

import {ADD, REMOVE} from './types';

export function Add(recipe: KtnRecipeShortModel) {
    return {
        type: ADD,
        payload: recipe
    }
}

export function Remove(recipe: KtnRecipeShortModel) {
    return {
        type: REMOVE,
        payload: recipe
    }
}
