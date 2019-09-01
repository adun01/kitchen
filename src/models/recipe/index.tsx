import {KtnProductModel} from "../product";
import {KtnStepModel} from "../step";
import {Observable, ReplaySubject} from "rxjs";
import {KtnRecipeStore, KtnShortRecipeStore} from "../../store/recipes";
import {KtnBaseModel} from "../index";
import {KtnCommonStore} from "../../store";
import {GetList, GetOne} from "../../store/recipes/actions";
import {filter, map} from "rxjs/operators";
import {Action} from "redux";

export class KtnRecipeModel {

    public id: number;
    public name: string;
    public url: string;
    public description: string;
    public image: string;
    public isFavorite: boolean = false;
    public contains: KtnProductModel[];
    public steps: KtnStepModel[];

    private static store$: ReplaySubject<KtnRecipeStore> = KtnBaseModel
        .getState$((state: KtnCommonStore): KtnRecipeStore => state.recipes);

    public static dispatch(action: Action): void {
        KtnBaseModel.dispatch(action);
    }

    public static getOne$(url: string): Observable<KtnRecipeModel | undefined> {
        KtnRecipeModel.dispatch(GetOne(url));
        return KtnRecipeModel.store$
            .pipe(
                map((state: KtnRecipeStore): KtnRecipeModel | undefined => {
                    return state.list.find((recipe: KtnRecipeModel): boolean => recipe.url === url);
                }),
                filter((recipe: KtnRecipeModel | undefined): boolean => !!recipe)
            );
    }

    constructor(raw: any) {
        this.id = raw.id;
        this.name = raw.name;
        this.url = raw.url;
        this.description = raw.description;
        this.image = raw.image;
        this.contains = raw.contains && raw.contains.map((contain: any) => new KtnProductModel(contain));
        this.steps = raw.steps && raw.steps.map((step: any) => new KtnStepModel(step));
    }
}
