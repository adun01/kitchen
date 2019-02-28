import * as types from './types';

export function searchRecipes(params: {
    name?: string,
    proteins?: number,
    carbohydrates?: number,
    fat?: number
}) {
    return {
        type: types.SEARCH_RECIPES,
        payload: params
    };
}
