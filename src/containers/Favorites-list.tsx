import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {KtnRecipeShortModel} from '../models/recipe/short';
import {KtnFavoritesModel} from '../models/favorites';
import {getUnsubscribe} from '../utils';

const toggle = (event: React.MouseEvent<HTMLElement>, recipe: KtnRecipeShortModel): void => {
    event.preventDefault();
    recipe.toogleIsFavorite();
};

export const KtnFavoritesList = () => {
    const [favorites, setFavorites] = useState<KtnRecipeShortModel[]>([]);

    useEffect(() => getUnsubscribe(KtnFavoritesModel.list$
        .subscribe((list: KtnRecipeShortModel[]): void => setFavorites(list))), []);

    return (
        <div>
            <h4>Любимые блюда:</h4>
            <h5 className="mt-3">
                {favorites.length ? favorites.map((recipe: KtnRecipeShortModel) => (
                    <Link to={'/recipe/' + recipe.url}
                          key={recipe.id}>
                        <button className="btn btn-primary cursor-pointer mb-2"
                                type="button">
                            <i className="mr-2 fa fa-window-close"
                               onClick={(event: React.MouseEvent<HTMLElement>) => toggle(event, recipe)}></i>
                            {recipe.name}
                        </button>
                    </Link>
                )) : 'Список пуст.'}
            </h5>
        </div>
    )
};
