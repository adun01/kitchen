import React, {Component} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {recipeInterface, stateInterface} from '../store';
import {Add, Remove} from '../store/favorites/actions';
import {FoodSlide} from '../components/Foor-slide/Food-slide';

class MainGallery extends Component<{
    recipes: recipeInterface[],
    dispatch: Dispatch
}> {

    public addFavorite(recipe: recipeInterface): void {
        this.props.dispatch(Add({
            id: recipe.id,
            name: recipe.name
        }));
    }

    public removeFavorite(recipe: recipeInterface): void {
        this.props.dispatch(Remove({
            id: recipe.id,
            name: recipe.name
        }));
    }

    render() {
        return (
            <div className="row">
                {this.props.recipes.map((recipe: recipeInterface, index: number) => {
                    return (
                        <div className="col-4 px-0"
                             key={recipe.id}>
                            <div className="ml-3 mb-3">
                                <FoodSlide recipe={recipe}
                                           removeFavorite={() => this.removeFavorite(recipe)}
                                           addFavorite={() => this.addFavorite(recipe)}>
                                </FoodSlide>
                            </div>
                        </div>

                    )
                })}
            </div>
        );
    }
}


export default connect((state: stateInterface): { recipes: recipeInterface[] } => {
    return {
        recipes: state.recipes
    }
})(MainGallery);
