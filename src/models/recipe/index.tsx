import {ReplaySubject, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

import {KtnStepModel} from './step';
export {KtnStepModel} from './step';
import {KtnProductModel} from './product';
export {KtnProductModel} from './product';

export interface KtnRecipesInterface {
    [key: string]: KtnRecipeModel
}

export class KtnRecipeModel {

    private static readonly collection$: ReplaySubject<KtnRecipesInterface> = new ReplaySubject<KtnRecipesInterface>(1);

    private static _collection: KtnRecipesInterface = {};

    public static init(): void {
        this.collection$
            .subscribe((collection: KtnRecipesInterface): KtnRecipesInterface => this._collection = collection);
    }

    public static getOne$(url: string): Observable<KtnRecipeModel> {
        if (!this._collection[url]) {
            fetch('/api/recipes/' + url)
                .then((response: Response): any => response.json())
                .then((recipe: any): void => {
                    const recipes = {
                        ...this._collection,
                        [recipe.url]: new KtnRecipeModel(recipe)
                    };
                    this.collection$.next(recipes);
                });
        }
        return this.collection$
            .pipe(
                filter((collection: KtnRecipesInterface): boolean => !!collection[url]),
                map((collection: KtnRecipesInterface): KtnRecipeModel => collection[url]),
                distinctUntilChanged()
            )
    }

    public id: number;
    public name: string;
    public url: string;
    public description: string;
    public image: string;
    public isFavorite: boolean = false;
    public contains: KtnProductModel[];
    public steps: KtnStepModel[];

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
