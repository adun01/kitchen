import {KtnRecipeShortModel} from "./recipe/short";
import {ReplaySubject} from "rxjs";

export class KtnFavoritesModel {
    private static _list: KtnRecipeShortModel[] = [];

    public static readonly list$: ReplaySubject<KtnRecipeShortModel[]> = new Proxy(
        new ReplaySubject<KtnRecipeShortModel[]>(1), {
            get(target, propKey, receiver) {
                const targetValue = Reflect.get(target, propKey, receiver);
                if (propKey === 'next') {
                    return function () {
                        KtnFavoritesModel.refreshLocationStore(arguments[0]);
                        return targetValue.apply(target, arguments);
                    }
                } else {
                    return targetValue;
                }
            }
        });

    public static init(list: any[]): void {
        this.list$.subscribe((list: KtnRecipeShortModel[]): KtnRecipeShortModel[] => this._list = list);
        this.list$.next(list.map((recipe: any): KtnRecipeShortModel => new KtnRecipeShortModel(recipe)));
    }

    public static remove(rm: KtnRecipeShortModel): void {
        this.list$.next(this._list.filter((favorite: KtnRecipeShortModel): boolean => rm.id !== favorite.id));
    }

    public static add(favorite: KtnRecipeShortModel): void {
        this._list.push(favorite);
        this.list$.next(this._list.slice());
    }

    private static refreshLocationStore(list: any): void {
        localStorage.setItem('favorites', JSON.stringify(list));
    }
}

const locationStore = localStorage.getItem('favorites');

KtnFavoritesModel.init(locationStore ? JSON.parse(locationStore) : []);
