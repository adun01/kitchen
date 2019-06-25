import {Store} from 'redux';
import {ReplaySubject} from 'rxjs';

import {KtnProductModel} from './product';

import {KtnCommonStore} from '../store';
import {KtnRecipeStore} from '../store/recipes';
import {SuccessOne, GetList} from '../store/recipes/actions';
import {Add} from '../store/favorites/actions';

export class KtnStepModel {
    public id: number;
    public description: string;
    public image: string;

    constructor(raw: any) {
        this.id = raw.id;
        this.description = raw.description;
        this.image = raw.image;
    }
}

export class KtnRecipeShortModel {
    private static _store: Store<KtnCommonStore>;
    private static _state$: ReplaySubject<KtnRecipeStore> = new ReplaySubject<KtnRecipeStore>(1);

    public static setStore(store: Store<KtnCommonStore>) {
        if (!this._store) {
            this._state$;
            this._store = store;
            this._store.subscribe(() => {
                const state = store.getState();
                this._state$.next(state.recipes);
            });
        }
    }

    public static getState$(): ReplaySubject<KtnRecipeStore> {
        return this._state$;
    }

    public static getList(payload: string): void {
        this._store.dispatch(GetList(payload));
    }

    public name: string;
    public image: string;
    public description: string;
    public url: string;
    public id: number;
    public isFavorite: boolean = false;

    constructor(raw: any) {
        this.name = raw.name;
        this.image = raw.image;
        this.description = raw.description;
        this.id = raw.id;
        this.url = raw.url;
    }

    public onToggleIsFavorite(): void {
        this.isFavorite = !this.isFavorite;
        KtnRecipeShortModel._store.dispatch(Add(this));
    }
}

export class KtnRecipeModel {

    private static _store: Store<KtnCommonStore>;

    public static setStore(store: Store<KtnCommonStore>) {
        if (!this._store) {
            this._store = store;
        }
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

        /*
                if (state.favorites.find((shortRecipe: KtnRecipeShortModel): boolean => recipe.id === shortRecipe.id)) {
                    recipe.isFavorite = true;
                }
        */
    }
}
