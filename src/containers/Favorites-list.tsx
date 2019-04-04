import React, {Component} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {stateInterface, recipeShortInterface} from '../store';

interface FavoritesListPropsInterface extends stateInterface {
    dispatch: Dispatch
}

class FavoritesList extends Component<FavoritesListPropsInterface> {

    public render() {
        const list = (this.props.favorites || []).map((recipe: recipeShortInterface): any => recipe.name);
        return (
            <div>
                {list}
            </div>
        )
    }
}

export default connect((state: stateInterface): stateInterface => state)(FavoritesList);
