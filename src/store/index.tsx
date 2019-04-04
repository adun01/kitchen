import {createStore, applyMiddleware} from 'redux';
import {Range} from 'react-input-range';
import {parse} from 'query-string';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import {REFRESH, UPDATE} from './recipes/types';
import {Refresh} from './recipes/actions';

import {REFRESH as REFRESH_FAVORITES} from './favorites/types';

export interface filtersInterface {
    withoutMeat: boolean,
    onlyFresh: boolean,
    isDietary: boolean,
    dukanDiet: boolean,

    [key: string]: boolean
}

export interface recipeShortInterface {
    name: string,
    id: number
}

const favorites: recipeShortInterface[] = JSON.parse(localStorage.getItem('favorites') || '[]');

export interface recipeInterface {
    id: number,
    name: string,
    description: string,
    image: string,
    isFavorite: boolean
}

export interface stateInterface {
    favorites: recipeShortInterface[],
    recipes: recipeInterface[],
    query: Range,
    filters: filtersInterface
}

const {min, max, withoutMeat, onlyFresh, isDietary, dukanDiet} = parse(window.location.search);

const initialState: stateInterface = {
    favorites: favorites,
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
        case UPDATE:
            return {
                ...state,
                recipes: state.recipes.map((recipe: recipeInterface): recipeInterface => {
                    if (action.payload.id === recipe.id) {
                        return action.payload;
                    }
                    return recipe;
                })
            };
            break;
        case REFRESH:
            return {
                ...state,
                recipes: action.payload
            };
            break;
        case REFRESH_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            };
            break;
        default:
            return state;
            break;

    }
}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
