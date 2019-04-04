import React, {Component} from 'react';

import {recipeShortInterface} from '../../store';
import './Favorite.scss';

export class Favorite extends Component<{
    recipe: recipeShortInterface,
    removeFavorite: () => void
}> {

    public removeFavorite(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.props.removeFavorite();
    }

    render() {
        return (
            <span onClick={(event: React.MouseEvent<HTMLElement>) => this.removeFavorite(event)}>
                {this.props.recipe.name}
            </span>
        )
    }
}
