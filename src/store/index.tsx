import {createStore} from 'redux';

export interface stateInterface {
    auth: {
        isAuth: boolean
    }
}

const initialState: stateInterface = {
    auth: {
        isAuth: false
    }
}

export const store = createStore((state: stateInterface = initialState, action): stateInterface => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                auth: {
                    isAuth: true
                }
            };
            break;

        case 'LOG_OUT':
            return {
                ...state,
                auth: {
                    isAuth: false
                }
            };
            break;
        default:
            return state;
            break;

    }
});
