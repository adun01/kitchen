import {parse, stringify} from 'query-string';
import {Subscription} from "rxjs";

export const updateQuery = (query: string, params: any): string => {
    const queryParams = parse(query);
    Object.keys(params).forEach((key: string): void => {
        if (typeof params[key] !== 'undefined') {
            queryParams[key] = params[key];
        }
    });
    return stringify(queryParams);
};

export const getStorage = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) || '[]');
};

export const setStorage = (key: string, data: any): void => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getUnsubscribe = (subscribe: Subscription): () => void => () => subscribe.unsubscribe();
