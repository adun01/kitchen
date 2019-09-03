import {KtnRecipeModel} from '../../models/recipe';
import {KtnRecipeShortModel} from '../../models/recipe/short';

export class KtnRecipeStore {
    public list: KtnRecipeModel[] = [];

    constructor(list?: KtnRecipeModel[]) {
        if (list) {
            this.list = list;
        }
    }
}

export class KtnShortRecipeStore {
    public list: KtnRecipeShortModel[] = [];

    constructor(list?: KtnRecipeShortModel[]) {
        if (list) {
            this.list = list;
        }
    }
}
