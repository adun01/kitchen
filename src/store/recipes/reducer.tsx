import {KtnRecipeStore} from './';
import {LIST_SUCCESS} from './types';

export function KtnRecipeReducer(state: KtnRecipeStore = new KtnRecipeStore(null), action: any): KtnRecipeStore {
    switch (action.type) {
        case LIST_SUCCESS:
            return {
                ...state,
                shortList: action.payload
            }

        default:
            return state;
            break;
    }
}
