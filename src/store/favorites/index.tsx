import {KtnRecipeShortModel} from '../../models/recipe';

export class KtnFavoritesStore {
    public list: KtnRecipeShortModel[];

    constructor(list: KtnRecipeShortModel[] = []) {
        this.list = list;
    }
}
