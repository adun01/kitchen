import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {stateInterface, filtersInterface} from '../store';
import KtnRangeCalories from '../components/Range-calories';


class MainSearch extends Component<stateInterface, filtersInterface> {

    constructor(props: stateInterface) {
        super(props);
        this.state = {
            withoutMeat: this.props.filters.withoutMeat,
            onlyFresh: this.props.filters.onlyFresh,
            isDietary: this.props.filters.isDietary,
            dukanDiet: this.props.filters.dukanDiet
        }
    }

    public isOnFilter(value: boolean): string {
        return classNames({
            'badge-primary': value,
            'badge-secondary': !value,
            'badge-pill': true,
            pointer: true,
            bagde: true
        });
    }

    public onChangeFilter(name: string): (event: React.MouseEvent<HTMLElement>) => void {
        return (event: React.MouseEvent<HTMLElement>) => {
            const value = !(this.state[name]);
            this.setState({
                ...this.state,
                [name]: value
            });
        }
    }

    public render() {
        const {withoutMeat, onlyFresh, isDietary, dukanDiet} = this.state;
        return (
            <form className="p-3">
                <h3 className="mb-5">Фильтр калорий</h3>
                <div className="form-row">
                    <div className="col-10">
                        <div className="form-group">
                            <input className="form-control form-control-lg"
                                   type="text"
                                   placeholder="Греческий диетический..."></input>
                        </div>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-secondary btn-lg w-100 "
                                type="submit">
                            Поиск
                        </button>
                    </div>
                </div>
                <div className="my-5">
                    <KtnRangeCalories query={this.props.query}></KtnRangeCalories>
                    <h5 className="d-inline-block mr-3">
                        <span className={this.isOnFilter(withoutMeat)}
                              onClick={this.onChangeFilter('withoutMeat')}>без мяса</span>
                    </h5>
                    <h5 className="d-inline-block mr-3 mb-3">
                        <span className={this.isOnFilter(onlyFresh)}
                              onClick={this.onChangeFilter('onlyFresh')}>только свежая пища</span>
                    </h5>
                    <h5 className="d-inline-block mr-3">
                        <span className={this.isOnFilter(isDietary)}
                              onClick={this.onChangeFilter('isDietary')}>диетическая пища</span>
                    </h5>
                    <h5 className="d-inline-block mr-3">
                        <span className={this.isOnFilter(dukanDiet)}
                              onClick={this.onChangeFilter('dukanDiet')}>диета Дюкана</span>
                    </h5>
                </div>
            </form>
        )
    }
}

export default connect((state: stateInterface): stateInterface => state)(MainSearch);
