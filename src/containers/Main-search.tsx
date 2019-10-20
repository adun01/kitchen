import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router';

import {KtnFiltersModel, KtnSearchInterface} from "../models/filters";

import {KtnRangeCalories} from '../components/Range-calories';
import {KtnLabelList} from './Filters-list';
import {KtnFavoritesList} from './Favorites-list';
import {updateQuery, getUnsubscribe} from '../utils';

export const KtnMainSearch = React.memo(withRouter(({history}) => {

    const [query, setQuery] = useState<string>();
    const [params, setParams] = useState<{ min: number, max: number }>();

    let min: number = 0, max: number = 0;

    const onSetFilter = () => (event: React.ChangeEvent<HTMLInputElement>): void => setQuery(event.target.value);

    const onSubmit = (): void => {
        const data = {
            min: min || params && params.min,
            max: max || params && params.max,
            query: query
        };
        history.push({
            search: '?' + updateQuery(history.location.search, data)
        });
        KtnFiltersModel.updateSearch(data);
    };

    const onUpdateRange = (minRange: number, maxRange: number): void => {
        min = minRange;
        max = maxRange;
    };

    useEffect(() => getUnsubscribe(KtnFiltersModel.search$
        .subscribe((data: KtnSearchInterface): void => {
            setQuery(data.query);
            setParams({
                min: data.min,
                max: data.max
            });
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
                               onChange={onSetFilter()}
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
                {params && <KtnRangeCalories
                    onUpdate={onUpdateRange}
                    filter={params}></KtnRangeCalories>}
            </div>
            <div className="my-5">
                <KtnLabelList></KtnLabelList>
                <div className="mt-5">
                    <KtnFavoritesList></KtnFavoritesList>
                </div>
            </div>
        </form>
    )
}));
