import React, {Component} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Subscription} from 'rxjs';

import {parse, stringify} from 'query-string';

import {KtnRecipeModel, KtnRecipeShortModel} from '../models/recipe';
import {KtnCommonStore} from '../store';
import {KtnRecipeStore} from '../store/recipes';
import {Add, Remove} from '../store/favorites/actions';
import {KtnFoodSlide} from '../components/Foor-slide/Food-slide';

export class KtnMainGallery extends Component<{}, {
    list: KtnRecipeShortModel[],
    subscribtion: Subscription | null
}> {

    constructor(props: {}) {
        super(props);
        this.state = {
            list: [],
            subscribtion: null
        };
    }

    componentDidMount() {
        if (this.state && this.state.list) {
            const query = {...parse(window.location.search)};
            KtnRecipeShortModel.getList('?' + stringify({
                ...query
            }));
        }

        const subscribtion = KtnRecipeShortModel.getState$()
            .subscribe((state: KtnRecipeStore) => {
                this.setState({
                    list: state.shortList,
                    subscribtion: subscribtion
                });
            });
    }

    componentWillUnmount() {
        this.state.subscribtion && this.state.subscribtion.unsubscribe();
    }

    render() {
        return (
            <div className="row">
                {this.state.list.map((recipe: KtnRecipeShortModel, index: number) => {
                    return (
                        <div className="col-4 px-0"
                             key={recipe.id}>
                            <div className="ml-3 mb-3">
                                {<KtnFoodSlide recipe={recipe}>
                                </KtnFoodSlide>}
                            </div>
                        </div>

                    )
                })}
            </div>
        );
    }
}
