import {Action, Store} from 'redux';
import {ReplaySubject} from "rxjs";

import {KtnCommonStore} from '../store';

export class KtnBaseModel {
    public static state$: ReplaySubject<any> = new ReplaySubject<KtnCommonStore>(1);

    private static _store: Store<KtnCommonStore>;

    public static getState$(selectFunction?: (state: KtnCommonStore) => any): ReplaySubject<any> {
        const replay: ReplaySubject<any> = new ReplaySubject<any>(1);
        KtnBaseModel.state$
            .subscribe((state: KtnCommonStore): void => replay
                .next(selectFunction ? selectFunction(state) : state));
        return replay;
    }

    public static dispatch(action: Action): void {
        KtnBaseModel._store.dispatch(action);
    }

    public static setStore(store: Store<KtnCommonStore>): void {
        KtnBaseModel._store = store;
        KtnBaseModel._store
            .subscribe((): void => KtnBaseModel.state$.next(KtnBaseModel._store.getState()));
    }
}
