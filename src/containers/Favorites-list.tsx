import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {getUnsubscribe} from '../utils';

import {KtnRecipeShortModel} from "../models/recipe/short";

const toggle = (event: React.MouseEvent<HTMLElement>, recipe: KtnRecipeShortModel): void => {
    event.preventDefault();
    recipe.toogleIsFavorite();
};

export const KtnFavoritesList = () => {

    const [favorites, setFavorites] = useState<KtnRecipeShortModel[]>([]);

    useEffect((): () => void => getUnsubscribe(KtnRecipeShortModel.getList$()
        .subscribe((list: KtnRecipeShortModel[]): void => {
            setFavorites(list.filter((recipe: KtnRecipeShortModel): boolean => recipe.isFavorite));
        })), []);

    return (
        <div>
            <h4>Любимые блюда:</h4>
            <h5 className="mt-3">
                {favorites.map((recipe: KtnRecipeShortModel) => (
                    <Link to={'/recipe/' + recipe.url}
                          key={recipe.id}>
                        <button className="btn btn-primary cursor-pointer mb-2"
                                type="button">
                            <i className="mr-2 fa fa-window-close"
                               onClick={(event: React.MouseEvent<HTMLElement>) => toggle(event, recipe)}></i>
                            {recipe.name}
                        </button>
                    </Link>
                ))}
            </h5>
        </div>
    )
};
