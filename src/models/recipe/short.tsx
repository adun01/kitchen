import {KtnBaseModel} from "../index";
import {GetList, Refresh} from "../../store/recipes/actions";
import {Observable, ReplaySubject} from "rxjs";
import {filter, map} from "rxjs/operators";
import {KtnCommonStore} from "../../store";
import {KtnShortRecipeStore} from "../../store/recipes";

export class KtnRecipeShortModel {

    private static store$: ReplaySubject<KtnShortRecipeStore> = KtnBaseModel
        .getState$((state: KtnCommonStore): KtnShortRecipeStore => state.shortRecipes);

    public static refreshList(search: string): void {
        KtnBaseModel.dispatch(GetList(search));
    }

    public static getList$(): Observable<KtnRecipeShortModel[]> {
        return KtnRecipeShortModel.store$
            .pipe(map((state: KtnShortRecipeStore): KtnRecipeShortModel[] => state.list),
                filter((list: KtnRecipeShortModel[]): boolean => !!list));
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

    public toogleIsFavorite() {
        this.isFavorite = !this.isFavorite;
        this._refresh();
    }

    private _refresh(): void {
        const newRecipe: KtnRecipeShortModel = Object.assign(new KtnRecipeShortModel({}), this);
        KtnBaseModel.dispatch(Refresh(newRecipe));
    }
}
