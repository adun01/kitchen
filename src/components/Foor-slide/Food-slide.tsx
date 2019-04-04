import React, {Component} from 'react';
import classNames from 'classnames';

import {recipeInterface} from '../../store';
import './Food-slide.scss';

export class FoodSlide extends Component<{
    recipe: recipeInterface,
    addFavorite: () => void,
    removeFavorite: () => void
}> {

    public actionForFavorite(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.props.recipe.isFavorite ? this.props.removeFavorite() : this.props.addFavorite();
    }

    render() {
        return (
            <a className="card text-white food-slide"
               href="#">
                <i className={classNames({
                       'fa-heart': !this.props.recipe.isFavorite,
                       'fa-trash remove': this.props.recipe.isFavorite,
                       'fa': true,
                       'actions-favotire': true
                   })}
                   onClick={(event: React.MouseEvent<HTMLElement>) => this.actionForFavorite(event)}></i>
                <img className="card-img-top"
                     src={this.props.recipe.image}
                     alt={this.props.recipe.name}></img>
                <span className="card-body">
                    <h5 className="card-title text-white">
                        {this.props.recipe.name}
                    </h5>
                    <p className="card-text">
                        {this.props.recipe.description}
                    </p>
                </span>
            </a>
        )
    }
}
