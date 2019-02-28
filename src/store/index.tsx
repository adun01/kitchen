import {createStore} from 'redux';
import {Range} from 'react-input-range';

export interface stateInterface {
    recipes: {
        list: {
            id: number
        }[]
    },
    query: Range
}

const initialState: stateInterface = {
    recipes: {
        list: []
    },
    query: {
        min: 30,
        max: 40
    }
}

export const store = createStore((state: stateInterface = initialState, action): stateInterface => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                recipes: {
                    list: []
                }
            };
            break;
        default:
            return state;
            break;

    }
});
