import React, {Component, ReactNode} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import {recipeInterface} from '../../store';
import './Food-slide.scss';

/**
 * Displaing food slide
 */
export class KtnFoodSlide extends Component<{
    recipe: recipeInterface,
    addFavorite: () => void,
    removeFavorite: () => void
}> {

    /**
     * adding or removing item from favorites
     */
    public actionForFavorite(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault();
        this.props.recipe.isFavorite ? this.props.removeFavorite() : this.props.addFavorite();
    }

    /**
     * getting class for icon
     */
    public getClassesForIcon(): string {
        return classNames({
            'fa-heart': !this.props.recipe.isFavorite,
            'fa-trash remove': this.props.recipe.isFavorite,
            'fa': true,
            'actions-favotire': true
        })
    }

    public render(): ReactNode {
        return (

            <Link className="card text-white food-slide"
                  to={'/recipe/' + this.props.recipe.url}>
                <i className={this.getClassesForIcon()}
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
            </Link>
        )
    }
}
