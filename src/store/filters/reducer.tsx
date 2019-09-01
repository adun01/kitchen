import {KtnFiltersStore} from './';
import {REFRESH} from "./types";
import {KtnFiltersModel} from "../../models/filters";
import {parse} from "query-string";

export function KtnFilterReducer(state: KtnFiltersStore, action: any): KtnFiltersStore {
    switch (action.type) {
        case REFRESH: {
            return Object.assign(new KtnFiltersModel(parse(window.location.search)))
        }
        default:
            return state;
    }
}
