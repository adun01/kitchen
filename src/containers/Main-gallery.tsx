import React, {Component} from 'react';
import {connect} from 'react-redux';

import {recipeInterface, stateInterface} from '../store';
import {FoodSlide} from '../components/Food-slide';

class MainGallery extends Component<{
    recipes: recipeInterface[]
}> {
    render() {
        const {recipes} = this.props;
        return (
            <div className="row">
                {recipes.map((recipe: recipeInterface, index: number) => {
                    return (
                        <div className="col-4 px-0"
                             key={recipe.id}>
                            <div className="ml-3 mb-3">
                                <FoodSlide recipe={recipe}></FoodSlide>
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
