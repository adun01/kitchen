import React, {useState, useEffect} from 'react';
import {getUnsubscribe} from "../utils";
import {KtnRecipeShortModel} from "../models/recipe/short";

/**
 * hook for filters
 */
type callbackfnType = (recipe: KtnRecipeShortModel) => boolean;

export const useShortList = (callbackFn?: callbackfnType): KtnRecipeShortModel[] => {
    const [list, setList] = useState<Array<KtnRecipeShortModel>>([]);

    useEffect((): () => void => getUnsubscribe(KtnRecipeShortModel.getList$()
        .subscribe((list: KtnRecipeShortModel[]): void => setList(list))), []);

    return !callbackFn ? list : list.filter(callbackFn);
};
