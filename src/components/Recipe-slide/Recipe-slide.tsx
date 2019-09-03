import React, {useMemo} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import {KtnRecipeShortModel} from '../../models/recipe/short';
import './Recipe-slide.scss';

const getClassesForIcon = (isFavorite: boolean): string => classNames({
    'fa-heart': !isFavorite,
    'fa-trash remove': isFavorite,
    'fa': true,
    'actions-favotire': true
});

export const KtnRecipeSlide = React.memo(({recipe}: { recipe: KtnRecipeShortModel }) => {

    const classNames: string = useMemo(() => getClassesForIcon(recipe.isFavorite), [recipe.isFavorite]);

    return (
        <Link className="card text-white food-slide border-0"
              to={'/recipe/' + recipe.url}>
            <i className={classNames}
               onClick={(event: React.MouseEvent<HTMLElement>) => {
                   event.preventDefault();
                   recipe.toogleIsFavorite();
               }}></i>
            <img className="card-img-top"
                 src={recipe.image}
                 alt={recipe.name}></img>
            <span className="card-body">
                <h5 className="card-title text-white">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
            </span>
        </Link>
    );
});
