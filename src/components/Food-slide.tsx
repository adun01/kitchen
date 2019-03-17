import React, {Component} from 'react';
import {recipeInterface} from '../store';

export class FoodSlide extends Component<{
    recipe: recipeInterface
}> {
    render() {
        return (
            <a className="card text-white"
               href="#">
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
