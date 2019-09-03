import React, {useEffect, useMemo, useState} from 'react';
import {withRouter} from "react-router";

import {KtnRangeCalories} from '../components/Range-calories';
import {KtnFilterList} from './Filters-list';
import {KtnFiltersModel} from "../models/filters";
import {KtnFavoritesList} from "./Favorites-list";
import {updateQuery} from '../utils';

import {getUnsubscribe} from '../utils';

let min: number, max: number;

export const KtnMainSearch = React.memo(withRouter(({history}) => {

    const [filter, setFilter] = useState<KtnFiltersModel>();
    const [query, setQuery] = useState<string>('');

    const onSetFilter = () => (event: React.ChangeEvent<HTMLInputElement>): void => setQuery(event.target.value);

    const onSubmit = (): void => {
        history.push({
            search: '?' + updateQuery(history.location.search, {
                min: min || filter && filter.min,
                max: max || filter && filter.max,
                query: query
            })
        });
        filter && filter.refresh();
    };

    const onUpdateRange = (minRange: number, maxRange: number): void => {
        min = minRange;
        max = maxRange;
    };

    const params: { min: number, max: number } = useMemo(() => ({
        min: min || filter && filter.min || 0,
        max: max || filter && filter.max || 0
    }), [min, max]);

    useEffect((): () => void => getUnsubscribe(KtnFiltersModel.getStore$()
        .subscribe((state: KtnFiltersModel): void => {
            setFilter(state);
            setQuery(state.query || '');
        })), []);

    return (
        <form className="p-3">
            <h3 className="mb-5">Фильтр калорий</h3>
            <div className="form-row">
                <div className="col-10">
                    <div className="form-group">
                        <input className="form-control form-control-lg"
                               type="text"
                               value={query}
                               onChange={onSetFilter}
                               placeholder="Греческий диетический..."></input>
                    </div>
                </div>
                <div className="col-2">
                    <button className="btn btn-secondary btn-lg w-100"
                            type="button"
                            onClick={onSubmit}>
                        Поиск
                    </button>
                </div>
            </div>
            <div className="form-row">
                {filter &&
                <KtnRangeCalories
                    onUpdate={onUpdateRange}
                    filter={params}></KtnRangeCalories>}
            </div>
            <div className="my-5">
                <KtnFilterList></KtnFilterList>
                <div className="mt-5">
                    <KtnFavoritesList></KtnFavoritesList>
                </div>
            </div>
        </form>
    )
}));
