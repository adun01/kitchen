import {Store} from 'redux';
import {ReplaySubject} from 'rxjs';

import {KtnCommonStore} from '../store';
import {KtnFiltersStore} from '../store/filters';

export class KtnFiltersModel {

    private static _store: Store<KtnCommonStore>;
    private static _state$: ReplaySubject<KtnFiltersStore> = new ReplaySubject<KtnFiltersStore>(1);

    public static setStore(store: Store<KtnCommonStore>) {
        if (!this._store) {
            this._state$;
            this._store = store;
            this._store.subscribe(() => {
                const state = store.getState();
                this._state$.next(state.filters);
            });
        }
    }

    public static getState$(): ReplaySubject<KtnFiltersStore> {
        return this._state$;
    }

    public withoutMeat: boolean;
    public onlyFresh: boolean;
    public isDietary: boolean;
    public dukanDiet: boolean;
    public min: number;
    public max: number;

    [key: string]: boolean | number;

    constructor(raw: any) {
        this.withoutMeat = raw.withoutMeat;
        this.onlyFresh = raw.onlyFresh;
        this.isDietary = raw.isDietary;
        this.dukanDiet = raw.dukanDiet;
        this.min = Number(raw.min || 30);
        this.max = Number(raw.max || 40);
    }
}
