import {Observable} from 'rxjs';
import {distinctUntilChanged} from "rxjs/operators";

import {KtnCommonStore} from '../store';
import {KtnBaseModel} from "./index";
import {Refresh} from "../store/filters/actions";

const namesFilters: {
    withoutMeat: string,
    onlyFresh: string,
    isDietary: string,
    dukanDiet: string,
    [key: string]: string;
} = {
    withoutMeat: 'без мяса',
    onlyFresh: 'только свежая пища',
    isDietary: 'диетическая пища',
    dukanDiet: 'диета Дюкана'
};

const keysFilters = Object.keys(namesFilters);

export class KtnFilterLabel {
    public key: string;
    public title: string;
    public state: boolean;

    constructor(props: any) {
        this.key = props.key;
        this.title = props.title;
        this.state = !!props.state;
    }

    public switchState(): void {
        this.state = !this.state;
    }
}

export class KtnFiltersModel {

    private static store$: Observable<KtnFiltersModel> = KtnBaseModel
        .getState$((state: KtnCommonStore): KtnFiltersModel => state.filters)
        .pipe(distinctUntilChanged());

    public labels: KtnFilterLabel[];

    public query: string;
    public min: number;
    public max: number;

    public static getStore$(): Observable<KtnFiltersModel> {
        return this.store$;
    }

    constructor(raw: any) {
        this.query = raw.query;
        this.min = Number(raw.min || 30);
        this.max = Number(raw.max || 70);
        this.labels = [];

        keysFilters.forEach((name: string): number => this.labels.push(new KtnFilterLabel({
            key: name,
            title: namesFilters[name],
            state: raw[name] && !(raw[name] === 'false')
        })));
    }

    public refresh(): void {
        KtnBaseModel.dispatch(Refresh());
    }
}
