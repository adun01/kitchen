import React, {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {withRouter, RouteComponentProps, match} from 'react-router';

import {KtnRecipeModel, KtnRecipeShortModel} from '../../models/recipe';
import {KtnCommonStore} from '../../store/';
import {GetOne} from '../../store/recipes/actions';
import KtnRecipe from '../../components/Recipe/Recipe';

interface Props extends RouteComponentProps {
    dispatch: Dispatch,
    match: match<{
        name: string
    }>,
    fullList: KtnRecipeModel[],
    shortList: KtnRecipeShortModel[]
}

/**
 * HOC for component Recipe
 */
class KtnHocForRecipe extends Component<Props, {
    recipe: KtnRecipeModel | undefined
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
        const recipe: undefined | KtnRecipeModel = props.fullList.find((recipe: KtnRecipeModel): boolean => recipe.url === props.match.params.name);
        if (!recipe) {
            props.dispatch(GetOne(props.match.params.name));
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

export default withRouter(connect((state: KtnCommonStore): {
    fullList: KtnRecipeModel[],
    shortList: KtnRecipeShortModel[]
} => {
    return {
        fullList: state.recipes.fullList,
        shortList: state.recipes.shortList
    }
})(KtnHocForRecipe));
