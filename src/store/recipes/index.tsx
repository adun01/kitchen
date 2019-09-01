import {KtnRecipeModel} from '../../models/recipe';
import {KtnRecipeShortModel} from '../../models/recipe/short';

export class KtnRecipeStore {
    public list: KtnRecipeModel[];

    constructor(list: KtnRecipeModel[] = []) {
        this.list = list;
    }
}

export class KtnShortRecipeStore {
    public list: KtnRecipeShortModel[];

    constructor(list: KtnRecipeShortModel[] = []) {
        this.list = list;
    }
}
