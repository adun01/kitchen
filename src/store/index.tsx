import {createStore, applyMiddleware} from 'redux';
import {Range} from 'react-input-range';
import {parse} from 'query-string';
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import {REFRESH_RECIPES} from './recipes/types'
import {RefreshRecipes} from './recipes/actions'

export interface filtersInterface {
    withoutMeat: boolean,
    onlyFresh: boolean,
    isDietary: boolean,
    dukanDiet: boolean,

    [key: string]: boolean
}

export interface recipeInterface {
    id: number,
    name: string,
    description: string,
    image: string
}

export interface stateInterface {
    recipes: recipeInterface[],
    query: Range,
    filters: filtersInterface
}

const {min, max, withoutMeat, onlyFresh, isDietary, dukanDiet} = parse(window.location.search);

const initialState: stateInterface = {
    recipes: [],
    query: {
        min: min ? +min : 30,
        max: max ? +max : 40
    },
    filters: {
        withoutMeat: Boolean(withoutMeat),
        onlyFresh: Boolean(onlyFresh),
        isDietary: Boolean(isDietary),
        dukanDiet: Boolean(dukanDiet)
    }
}

const sagaMiddleware = createSagaMiddleware()

export const store = createStore((state: stateInterface = initialState, action: any): stateInterface => {
    switch (action.type) {
        case REFRESH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };
            break;
        default:
            return state;
            break;

    }
}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
