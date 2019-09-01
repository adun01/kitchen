import {KtnBaseModel} from "./index";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

import {GetOne} from "../store/profiles/actions";
import {KtnProfileStore} from "../store/profiles";
import {KtnCommonStore} from "../store";

const selectStore = (state: KtnCommonStore): KtnProfileStore => state.profile;

export class KtnProfileModel {

    private static store$: Observable<KtnProfileStore> = KtnBaseModel.getState$(selectStore);

    public static getOne$(): Observable<KtnProfileModel> {
        KtnBaseModel.dispatch(GetOne());
        return KtnProfileModel.store$
            .pipe(filter((state: KtnProfileStore): boolean => !!state.data),
                map((state: KtnProfileStore) => state.data))
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
