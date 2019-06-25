import React, {Component, ReactNode} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router';
import classNames from 'classnames';
import {parse, stringify} from 'query-string';

import {KtnCommonStore} from '../store/';
import {KtnFiltersModel} from '../models/filters';
import {GetList} from '../store/recipes/actions';

interface FavoritesListPropsInterface extends KtnCommonStore, RouteComponentProps {
    dispatch: Dispatch
}

const dictionary: {
    withoutMeat: string,
    onlyFresh: string,
    isDietary: string,
    dukanDiet: string,
    [key: string]: string
} = {
    withoutMeat: 'без мяса',
    onlyFresh: 'только свежая пища',
    isDietary: 'диетическая пища',
    dukanDiet: 'диета Дюкана'
};

class KtnFilterList extends Component<FavoritesListPropsInterface, KtnFiltersModel> {

    constructor(props: FavoritesListPropsInterface) {
        super(props);
        this.state = {...this.props.filters};
    }

    /**
     * returning classes for badge
     */
    public getClassesForBadge(value: boolean): string {
        return classNames({
            'badge-primary': value,
            'badge-secondary': !value,
            'badge-pill': true,
            pointer: true,
            bagde: true
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    public onChangeFilter(name: string): (event: React.MouseEvent<HTMLElement>) => void {
        return (event: React.MouseEvent<HTMLElement>) => this.refreshList(name)
    }

    private refreshList(name?: string): void {
        const query = {...parse(window.location.search)};

        let value: any;

        if (name) {
            value = !Boolean((this.state[name]))
            if (value) {
                query[name] = value + '';
            } else {
                delete query[name];
            }

            this.setState({
                ...this.state,
                [name]: value
            });
        }

        const search = '?' + stringify({
            ...query
        });

        this.props.dispatch(GetList(search));
        this.props.history.push(search);
    }

    public render(): ReactNode {
        return (
            <div>
                {Object.keys(this.state).map((name: string, index: number): ReactNode => {
                    const value: boolean = !!(this.state[name]);
                    return (
                        <h5 className="d-inline-block mr-3" key={index}>
                            <span className={this.getClassesForBadge(value)}
                                  onClick={this.onChangeFilter(name)}>
                                {dictionary[name]}
                            </span>
                        </h5>
                    )
                })}
            </div>
        )
    }
}

export default connect((state: KtnCommonStore): KtnCommonStore => state)(withRouter(KtnFilterList));
