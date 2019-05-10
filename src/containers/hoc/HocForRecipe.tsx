import React, {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {withRouter, RouteComponentProps, match} from 'react-router';

import {stateInterface, recipeInterface} from '../../store';
import {One} from '../../store/recipes/actions';
import KtnRecipe from '../../components/Recipe/Recipe';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    match: match<{
        name: string
    }>,
    recipes: recipeInterface[]
}

/**
 * HOC for component Recipe
 */
class KtnHocForRecipe extends Component<Props, {
    recipe: recipeInterface | undefined
}> {

    constructor(props: Props) {
        super(props)
        this.state = {
            recipe: undefined
        };
    }

    /**
     * Search for recipe by = url: string (from url state)
     */
    static getDerivedStateFromProps(props: Props, state: any) {
        const recipe: undefined | recipeInterface = props.recipes.find((recipe: recipeInterface): boolean => recipe.url === props.match.params.name);
        if (!recipe) {
            props.dispatch(One(props.match.params.name));
        } else {
            return {
                recipe: recipe
            }
        }
        return null;
    }

    render(): ReactNode {
        return (
            <div>
                {this.state.recipe && <KtnRecipe recipe={this.state.recipe}></KtnRecipe>}
            </div>
        );
    }
}

export default withRouter(connect((state: stateInterface): { recipes: recipeInterface[] } => {
    return {recipes: state.recipes};
})(KtnHocForRecipe));
