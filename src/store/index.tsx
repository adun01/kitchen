import {createStore} from 'redux';
import {Range} from 'react-input-range';

interface filtersInterface {
    withoutMeat: boolean,
    onlyFresh: boolean,
    isDietary: boolean,
    dukanDiet: boolean
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

const initialState: stateInterface = {
    recipes: [
        {
            id: 1,
            name: 'Запеченные куринные ножки с соусом тартар',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            image: './images/1.jpg'
        }, {
            id: 2,
            name: 'Запеченные куринные ножки с соусом тартар',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            image: './images/4.jpg'
        }, {
            id: 3,
            name: 'Запеченные куринные ножки с соусом тартар',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            image: './images/3.jpg'
        }, {
            id: 4,
            name: 'Запеченные куринные ножки с соусом тартар',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            image: './images/4.jpg'
        }, {
            id: 5,
            name: 'Запеченные куринные ножки с соусом тартар',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            image: './images/4.jpg'
        }, {
            id: 6,
            name: 'Запеченные куринные ножки с соусом тартар',
            description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            image: './images/4.jpg'
        }
    ],
    query: {
        min: 30,
        max: 40
    },
    filters: {
        withoutMeat: false,
        onlyFresh: false,
        isDietary: true,
        dukanDiet: false
    }
}

export const store = createStore((state: stateInterface = initialState, action): stateInterface => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state
            };
            break;
        default:
            return state;
            break;

    }
});
