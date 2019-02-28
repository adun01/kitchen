import React, {Component} from 'react';
import InputRange, {Range} from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface caloriesInterface {
    proteins: number,
    carbohydrates: number,
    fats: number
}

let numberCallRender = 0;

export default class KtnRangeCalories extends Component<{ query: Range }, {
    min: number,
    max: number,
    calories: caloriesInterface
}> {

    constructor(props: { query: Range }) {
        super(props);
        this.state = {
            min: this.props.query.min,
            max: this.props.query.max,
            calories: this.getCalories()
        };
    }

    render() {
        return (
            <div className="form-group">
                <div className="form-row">
                    <div className="col-10">
                        <InputRange
                            formatLabel={this.formatLabel}
                            maxValue={100}
                            minValue={0}
                            value={{
                                min: this.state.min,
                                max: this.state.max
                            }}
                            onChange={value => this.onChange(value)}/>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary float-right">Submit!</button>
                    </div>
                </div>
                <br/>
                <div className="alert text-white bg-dark">
                    <div className="row">
                        <div className="col-2">
                            proteins: {this.state.calories.proteins} <sup className="text-warning">calory</sup>
                        </div>
                        <div className="col-3">
                            carbohydrates: {this.state.calories.carbohydrates} <sup
                            className="text-warning">calory</sup>
                        </div>
                        <div className="col-2">
                            fats: {this.state.calories.fats} <sup className="text-warning">calory</sup>
                        </div>
                        <div className="col-5">
                            total: {this.getTotal()} <sup className="text-warning">(per 100 grams of product)</sup>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    public formatLabel(value: number, name: string): string {
        if (numberCallRender === 0) {
            numberCallRender++;
            return '0';
        }
        if (numberCallRender === 1) {
            numberCallRender++;
            return 'proteins :' + value;
        }
        if (numberCallRender === 2) {
            numberCallRender++;
            return 'carbohydrates :' + value;
        }
        if (numberCallRender === 3) {
            numberCallRender = 0;
            return '100';
        }
        return '';
    }

    public onChange(params: Range | number): void {
        if (typeof params === 'object') {
            this.setState({
                ...this.state,
                min: params.min,
                max: params.max,
                calories: this.getCalories()
            });
        }
    }

    private getCalories(): caloriesInterface {
        return {
            proteins: this.getProteins(),
            carbohydrates: this.getCarbohydrates(),
            fats: this.getFats()
        }
    }

    private getProteins(): number {
        const proteins = this.state ? this.state.min : this.props.query.min;
        return proteins * 4;
    }

    private getCarbohydrates(): number {
        const proteins = this.getProteins() / 4;
        const carbohydrates = this.state ? this.state.max : this.props.query.max;
        return (carbohydrates - proteins) * 4;
    }

    private getFats(): number {
        const carbohydrates = this.state ? this.state.max : this.props.query.max;
        return (100 - carbohydrates) * 9;
    }

    private getTotal(): number {
        return this.getProteins() + this.getCarbohydrates() + this.getFats();
    }
}
