import {KtnRecipeModel, KtnRecipeShortModel} from '../../models/recipe';

export class KtnRecipeStore {
    public fullList: KtnRecipeModel[];
    public shortList: KtnRecipeShortModel[];

    constructor(data: any = null) {
        this.fullList = data && data.fullList || [];
        this.shortList = data && data.shortlist || [];
    }
}
