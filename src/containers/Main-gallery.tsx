import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {UnregisterCallback} from 'history';
import {parse, stringify} from 'query-string';

import {getUnsubscribe} from '../utils';

import {KtnRecipeShortModel} from '../models/recipe/short';
import {KtnRecipeSlide} from '../components/Recipe-slide/Recipe-slide';

const refreshList: () => void = (): void => KtnRecipeShortModel
    .refreshList('?' + stringify({...parse(window.location.search)}));

export const KtnMainGallery = withRouter(({history: {listen}}) => {
    const [list, setList] = useState<KtnRecipeShortModel[]>([]);

    useEffect((): () => void => {
        refreshList();
        return getUnsubscribe(KtnRecipeShortModel.getList$()
            .subscribe((list: KtnRecipeShortModel[]): void => setList(list)))
    }, []);

    useEffect((): UnregisterCallback => listen((): void => refreshList()), []);

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
