import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {UnregisterCallback} from 'history';
import {parse, stringify} from 'query-string';

import {KtnRecipeShortModel, KtnShortRecipes} from '../models/recipe/short';
import {KtnRecipeSlide} from '../components/Recipe-slide/Recipe-slide';
import {getUnsubscribe} from "../utils";

const refreshList: () => void = (): void => KtnRecipeShortModel
    .refresh('?' + stringify({...parse(window.location.search)}));

export const KtnMainGallery = withRouter(({history: {listen}}) => {
    const [list, setList] = useState<KtnRecipeShortModel[]>([]);

    useEffect((): UnregisterCallback => {
        refreshList();
        return listen((): void => refreshList());
    }, []);

    useEffect((): () => void => getUnsubscribe(KtnRecipeShortModel.collection$
        .subscribe((collection: KtnShortRecipes): void => {
            setList(Object.keys(collection).map((id: string): KtnRecipeShortModel => collection[+id]))
        })), []);

    return (
        <div className="row">
            {list.map((recipe: KtnRecipeShortModel) => {
                return (
                    <div className="col-4 px-0"
                         key={recipe.id}>
                        <div className="ml-3 mb-3">
                            <KtnRecipeSlide recipe={recipe}></KtnRecipeSlide>
                        </div>
                    </div>
                )
            })}
        </div>
    );
});
