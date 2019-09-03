import React, {useMemo, useState} from 'react';
import InputRange, {Range} from 'react-input-range';
import 'react-input-range/lib/css/index.css';

/**
 * Return class for fat food
 */
const isDangerClassName = (fats: number): string => fats >= 50 ? 'text-danger' : '';

/**
 * to calculate the total amount of calories
 */
const getTotal = (min: number, max: number): number => (max * 4) + (min * 4) + ((100 - max) * 9);

/**
 * returing label for range calories
 */
let numberCallRender = 0;

const getLabel = (value: number): string => {
    let result: string = '';
    switch (numberCallRender) {
        case 0:
            result += 0;
            break;
        case 3:
            result += 100;
            break;
        default:
            result += value;
    }
    numberCallRender = numberCallRender > 2 ? 0 : ++numberCallRender;
    return result;
};

export const KtnRangeCalories = React.memo((props: {
    filter: {
        min: number,
        max: number
    },
    onUpdate: (min: number, max: number) => void
}) => {

    const [min, setMin] = useState<number>(props.filter.min);
    const [max, setMax] = useState<number>(props.filter.max);

    const carbohydrates: number = max - min, fats: number = 100 - max;

    const total: number = useMemo(() => getTotal(min, max), [min, max]);
    const fatClassName: string = useMemo(() => isDangerClassName(fats), [fats]);

    const onUpdate = (range: Range | number): void => {
        if (typeof range === 'object') {
            setMin(range.min);
            setMax(range.max);
            props.onUpdate(range.min, range.max);
        }
    };

    return (
        <div className="bg-light col-12">
            <div className="form-row mb-5 mt-3">
                <div className="col-12">
                    <InputRange
                        formatLabel={getLabel}
                        maxValue={100}
                        minValue={0}
                        value={{
                            min: min,
                            max: max
                        }}
                        onChange={onUpdate}/>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Белки</th>
                    <th scope="col">Углеводы</th>
                    <th scope="col">Жиры</th>
                    <th scope="col">Всего</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row">Грамм</td>
                    <td>{min}</td>
                    <td>{carbohydrates}</td>
                    <td className={fatClassName}>{fats}</td>
                    <th scope="row">100</th>
                </tr>
                <tr>
                    <td scope="row">Калорий</td>
                    <td>{min * 4}</td>
                    <td>{carbohydrates * 4}</td>
                    <td className={fatClassName}>{fats * 9}</td>
                    <th scope="row">{total}</th>
                </tr>
                </tbody>
            </table>
            <sup className="text-warning">*(на 100 грамм продукта)</sup>
        </div>
    )
});
