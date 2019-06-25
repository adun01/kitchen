import React, {Component, ReactNode} from 'react';
import InputRange, {Range} from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import classNames from 'classnames';
import {Subscription} from 'rxjs';

import {KtnFiltersModel} from '../models/filters';

interface caloriesInterface {
    proteins: number,
    carbohydrates: number,
    fats: number
}

let numberCallRender: number = 0;

interface KtnRangeCaloriesState {
    min: number,
    max: number,
    calories: caloriesInterface,
    isFat: boolean,
    sub$: Subscription | null
}

interface KtnRangeCaloriesProps {
    forRecipe: boolean
}

/**
 * Displaing Filter by type calories
 */
export default class KtnRangeCalories extends Component<KtnRangeCaloriesProps, KtnRangeCaloriesState> {

    /**
     * Return class for fat food
     */
    public isDangerClassName(): string {
        return classNames({
            'text-danger': this.isFat()
        });
    }

    constructor(props: KtnRangeCaloriesProps) {
        super(props);
        this.state = {
            min: 0,
            max: 0,
            calories: this.getCalories(),
            isFat: false,
            sub$: null
        };
    }

    componentDidMount() {
        const subscribtion = KtnFiltersModel
            .getState$()
            .subscribe((filter: KtnFiltersModel) => {
                this.setState((state: KtnRangeCaloriesState, props: KtnRangeCaloriesProps): KtnRangeCaloriesState => ({
                        min: filter.min,
                        max: filter.max,
                        calories: this.getCalories(),
                        isFat: false,
                        sub$: null
                    }
                ));
            });
    }

    componentWillUnmount() {
        this.state.sub$ && this.state.sub$.unsubscribe();
    }

    /**
     * returing label for range calories
     */
    public getFormatLabel(value: number, name: string): string {
        if (numberCallRender === 0) {
            numberCallRender++;
            return '0';
        } else if (numberCallRender === 1) {
            numberCallRender++;
            return '' + value;
        }
        else if (numberCallRender === 2) {
            numberCallRender++;
            return '' + value;
        }
        else if (numberCallRender === 3) {
            numberCallRender = 0;
            return '100';
        }
        return '';
    }

    /**
     * updating state
     */
    public onUpdateState(params: Range | number): void {
        if (typeof params === 'object') {
            this.setState((prevState: KtnRangeCaloriesState, props: KtnRangeCaloriesProps): KtnRangeCaloriesState => ({
                    ...this.state,
                    min: params.min,
                    max: params.max,
                    calories: this.getCalories(),
                    isFat: this.isFat()
                }
            ));
        }
    }

    /**
     * Checking fat food or easy
     */
    private isFat(): boolean {
        return this.state ? this.state.max <= 50 : false;
    }

    /**
     * getting all type calories
     */
    private getCalories(): caloriesInterface {
        return {
            proteins: this.getProteins(),
            carbohydrates: this.getCarbohydrates(),
            fats: this.getFats()
        }
    }

    /**
     * getting calories from proteints
     */
    private getProteins(): number {
        return this.state ? this.state.min * 4 : 0;
    }

    /**
     * getting calories from carbohydrates
     */
    private getCarbohydrates(): number {
        return this.state ? (this.state.max - this.state.min) * 4 : 0;
    }

    /**
     * getting calories from fats
     */
    private getFats(): number {
        const fats = (100 - (this.state ? this.state.max : 0)) * 9;
        return Number(fats.toFixed());
    }

    /**
     * getting Total count calories
     */
    private getTotal(): number {
        return this.getProteins() + this.getCarbohydrates() + this.getFats();
    }


    render(): ReactNode {
        return (
            <div className="bg-light p-4 w-100">
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
                        <td>{this.state && this.state.calories ? this.state.calories.proteins / 4 : 0}</td>
                        {/*<td>{this.state ? this.state.calories.carbohydrates : 0 / 4}</td>
                        */}{/*<td className={this.isDangerClassName()}>{(this.state ? this.state.calories.fats : 0 / 9).toFixed()}</td>
                        */}
                        <th scope="row">
                            100
                        </th>
                    </tr>
                    {/*<tr>
                        <td scope="row">Калорий</td>
                        <td>{this.state.calories.proteins}</td>
                        <td>{this.state.calories.carbohydrates}</td>
                        <td className={this.isDangerClassName()}>{this.state.calories.fats}</td>
                        <th scope="row">
                            {this.getTotal()}
                        </th>
                    </tr>*/}
                    </tbody>
                </table>
                {!this.props.forRecipe ? <sup className="text-warning">*(на 100 грамм продукта)</sup> : ''}
                {/*<div className="form-row my-4">
                    <div className="col-12">
                        <InputRange
                            formatLabel={this.getFormatLabel}
                            maxValue={100}
                            minValue={0}
                            value={{
                                min: this.state.min || 0,
                                max: this.state.max || 0
                            }}
                            onChange={value => this.onUpdateState(value)}/>
                    </div>
                </div>*/}
            </div>
        )
    }
}
