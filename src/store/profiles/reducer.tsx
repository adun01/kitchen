import {KtnProfileStore} from './';
import {ONE_SUCCESS} from './types';

export function KtnProfilesReducer(state: KtnProfileStore = new KtnProfileStore, action: any): KtnProfileStore {
    switch (action.type) {
        case ONE_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
