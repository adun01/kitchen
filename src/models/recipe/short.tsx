import {ReplaySubject} from 'rxjs';
import {KtnFavoritesModel} from '../favorites';

export interface KtnShortRecipes {
    [key: number]: KtnRecipeShortModel
}

export class KtnRecipeShortModel {

    public static readonly collection$: ReplaySubject<KtnShortRecipes> = new ReplaySubject<KtnShortRecipes>(1);

    private static _favoritesList: number[] = [];

    public static init(): void {
        KtnFavoritesModel.list$
            .subscribe((list: KtnRecipeShortModel[]): void => {
                this._favoritesList = list.map((recipe: KtnRecipeShortModel): number => recipe.id);
            });
    }

    public static refresh(params: string): void {
        fetch('/api/search' + params)
            .then((response: Response): any => response.json())
            .then((rawRecipes: any) => {
                const list: KtnShortRecipes = {};
                rawRecipes.map((recipe: any): void => {
                    if (this._favoritesList.includes(recipe.id)) {
                        recipe.isFavorite = true;
                    }
                    list[recipe.id] = new KtnRecipeShortModel(recipe);
                });
                this.collection$.next(list);
            });
    }

    public name: string;
    public image: string;
    public description: string;
    public url: string;
    public id: number;
    public isFavorite: boolean;

    constructor(raw: any) {
        this.name = raw.name;
        this.image = raw.image;
        this.description = raw.description;
        this.id = raw.id;
        this.url = raw.url;
        this.isFavorite = Boolean(raw.isFavorite);
    }

    public toogleIsFavorite(): void {
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
            KtnFavoritesModel.add(this);
        } else {
            KtnFavoritesModel.remove(this);
        }
    }
}

setTimeout(() => KtnRecipeShortModel.init());
