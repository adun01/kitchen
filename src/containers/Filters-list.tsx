import React, {useEffect, useMemo, useState} from 'react';
import {withRouter,} from 'react-router';
import classNames from 'classnames';

import {getUnsubscribe, updateQuery} from "../utils";

import {KtnFiltersModel, KtnFilterLabel} from '../models/filters';

const getClassesLabel = (value: boolean): string => {
    return classNames({
        'badge-primary': value,
        'badge-secondary': !value,
        'badge-pill': true,
        pointer: true,
        bagde: true
    });
};

export const KtnFilterList = React.memo(withRouter(({history: {push, location: {search}}}) => {

    const [labels, setLabels] = useState<KtnFilterLabel[]>([]);
    const switchState = (label: KtnFilterLabel): void => {
        label.switchState();
        push({
            search: '?' + updateQuery(search, {
                [label.key]: label.state
            })
        });
    };

    useEffect((): () => void => getUnsubscribe(KtnFiltersModel.getStore$()
        .subscribe((state: KtnFiltersModel): void => setLabels(state.labels))), []);

    return (
        <div>
            {labels.map((label: KtnFilterLabel) => (
                <h5 className="d-inline-block mr-3 cursor-pointer"
                    onClick={(): void => switchState(label)}
                    key={label.key}>
                    <span className={getClassesLabel(label.state)}>
                        {label.title}
                    </span>
                </h5>
            ))}
            <br/>
        </div>
    )
}));
