import {LIST_SUCCESS, REFRESH as REFRESH_SHORTRECIPE, ONE_SUCCESS as ONE_SUCCESSRECIPE} from "./recipes/types";
import {ONE_SUCCESS} from "./profiles/types";
import {REFRESH as REFRESH_FILTER} from "./filters/types";

import {KtnRecipeReducer, KtnShortRecipeReducer} from "./recipes/reducer";
import {KtnProfilesReducer} from "./profiles/reducer";
import {KtnFilterReducer} from "./filters/reducer";

import {KtnProfileStore} from "./profiles";
import {KtnRecipeStore, KtnShortRecipeStore} from "./recipes";
import {KtnFavoritesStore} from "./favorites";
import {KtnFiltersStore} from "./filters";

export class KtnCommonStore {
    public profile: KtnProfileStore;
    public recipes: KtnRecipeStore;
    public shortRecipes: KtnShortRecipeStore;
    public favorites: KtnFavoritesStore;
    public filters: KtnFiltersStore;

    constructor(recipes: KtnRecipeStore,
                shortRecipes: KtnShortRecipeStore,
                profile: KtnProfileStore,
                favorites: KtnFavoritesStore,
                filters: KtnFiltersStore) {
        this.recipes = recipes;
        this.shortRecipes = shortRecipes;
        this.profile = profile;
        this.favorites = favorites;
        this.filters = filters;
    }
}

export const KtnCommonReducer = (state: KtnCommonStore, action: any): KtnCommonStore => {
    switch (action.type) {
        case ONE_SUCCESSRECIPE:
            return {
                ...state,
                recipes: KtnRecipeReducer(state.recipes, action)
            };
        case LIST_SUCCESS:
        case REFRESH_SHORTRECIPE:
            return {
                ...state,
                shortRecipes: KtnShortRecipeReducer(state.shortRecipes, action)
            };
        case ONE_SUCCESS:
            return {
                ...state,
                profile: KtnProfilesReducer(state.profile, action)
            };
        case REFRESH_FILTER:
            return {
                ...state,
                filters: KtnFilterReducer(state.filters, action)
            };
        default:
            return state;
    }
};
