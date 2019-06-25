import {ADD, REMOVE} from './types';

export function Add(name: string) {
    return {
        type: ADD,
        payload: name
    }
}

export function Remove(name: string) {
    return {
        type: REMOVE,
        payload: name
    }
}
