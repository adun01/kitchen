import React, {Component, ReactNode} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router';
import classNames from 'classnames';
import {parse, stringify} from 'query-string';

import {stateInterface, filtersInterface} from '../store';
import {Search} from '../store/recipes/actions';

interface FavoritesListPropsInterface extends stateInterface, RouteComponentProps {
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

class KtnFilterList extends Component<FavoritesListPropsInterface, filtersInterface> {

    constructor(props: FavoritesListPropsInterface) {
        super(props);
        this.state = {
            withoutMeat: this.props.filters.withoutMeat,
            onlyFresh: this.props.filters.onlyFresh,
            isDietary: this.props.filters.isDietary,
            dukanDiet: this.props.filters.dukanDiet
        }
    }

    /**
     * returning classes for badge
     */
    public getClassesForBadge(value: string): string {
        return classNames({
            'badge-primary': this.state[value],
            'badge-secondary': !this.state[value],
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
            value = !(this.state[name])
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

        this.props.dispatch(Search(search));
        this.props.history.push(search);
    }

    public render(): ReactNode {
        return (
            <div>
                {Object.keys(this.state).map((name: string, index: number): ReactNode => {
                    return (
                        <h5 className="d-inline-block mr-3" key={index}>
                            <span className={this.getClassesForBadge(name)}
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

export default connect((state: stateInterface): stateInterface => state)(withRouter(KtnFilterList));
