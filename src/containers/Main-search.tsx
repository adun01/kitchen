import React, {Component} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {History} from 'history';
import {parse, stringify} from 'query-string';

import {KtnCommonStore} from '../store';
import KtnRangeCalories from '../components/Range-calories';
import KtnFilterList from './Filters-list';

export class KtnMainSearch extends Component<{
    history: History
}> {

    public render() {
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
                    <KtnRangeCalories forRecipe={false}></KtnRangeCalories>
                    {/*<KtnFilterList></KtnFilterList>*/}
                </div>
            </form>
        )
    }
}
