import {KtnRecipeShortModel} from '../../models/recipe/short';

export class KtnFavoritesStore {
    public list: KtnRecipeShortModel[];

    constructor(list: KtnRecipeShortModel[] = []) {
        this.list = list;
    }
}
