import {ReplaySubject} from 'rxjs';
import {parse} from "query-string";

const namesFilters: {
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

    public switchState(callBack?: () => void): void {
        this.state = !this.state;
        callBack && callBack();
    }
}

export interface KtnSearchInterface {
    min: number;
    max: number;
    query: string;
}

export class KtnFiltersModel {

    public static readonly labels$: ReplaySubject<KtnFilterLabel[]> = new ReplaySubject(1);
    public static readonly search$: ReplaySubject<KtnSearchInterface> = new ReplaySubject(1);

    private static _labels: KtnFilterLabel[] = [];
    private static _search: KtnSearchInterface = {
        min: 0,
        max: 0,
        query: ''
    };

    public static get search() {
        return this._search;
    }

    public static updateSearch(params: any) {
        const {query, min, max} = params;
        this._search = {
            ...this._search,
            query, min: +min || 30, max: +max || 70
        };
        this.search$.next(this._search);
    }

    public static init(params: any): void {
        this.updateSearch(params);
        keysFilters.forEach((name: string): void => {
            if (params[name]) {
                this._labels.push(
                    new Proxy(new KtnFilterLabel({
                        key: name,
                        title: namesFilters[name],
                        state: params[name] && !(params[name] === 'false')
                    }), {
                        get(target, propKey, receiver) {
                            const targetValue = Reflect.get(target, propKey, receiver);
                            if (propKey === 'switchState') {
                                return function (...args: any) {
                                    args.push(() => {
                                        KtnFiltersModel.labels$.next(KtnFiltersModel._labels)
                                    });
                                    return targetValue.apply(target, args);
                                }
                            } else {
                                return targetValue;
                            }
                        }
                    })
                )
            }
        });
        this.labels$.next(this._labels);
    }
}

KtnFiltersModel.init(parse(window.location.search));
