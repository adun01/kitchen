import {Observable, ReplaySubject} from "rxjs";
import {distinctUntilChanged, filter, map} from "rxjs/operators";

export interface KtnProfilesInterface {
    [key: number]: KtnProfileModel
}

export class KtnProfileModel {

    private static readonly collection$: ReplaySubject<KtnProfilesInterface> = new ReplaySubject(1);

    private static _collection: KtnProfilesInterface = {};

    private static currentId: number;

    public static getAuth(): void {
        fetch('/api/auth')
            .then((response: Response): any => response.json())
            .then((profile: any): void => {
                this.currentId = profile.id;
                const collection: KtnProfilesInterface = {
                    ...this._collection,
                    [this.currentId]: new KtnProfileModel(profile)
                };
                this.collection$.next(collection);
            });
    }

    public static getCurrent$(): Observable<KtnProfileModel> {
        return this.collection$
            .pipe(
                filter((collection: KtnProfilesInterface): boolean => !!collection[this.currentId]),
                map((collection: KtnProfilesInterface): KtnProfileModel => collection[this.currentId]),
                distinctUntilChanged())
    }

    public id: number;
    public name: string;
    public surName: string;

    constructor(raw: any) {
        this.id = raw.id;
        this.name = raw.name;
        this.surName = raw.surName;
    }
}

KtnProfileModel.getAuth();
