import React, {Component} from 'react';
import {connect} from 'react-redux';

import {stateInterface} from '../../store';
import KtnRangeCalories from '../presentationals/Range-calories';

class MainSearch extends Component<stateInterface> {
    render() {
        return (
            <form>
                <div className="form-group">
                    <input type="text"
                           className="form-control"
                           placeholder="Caesar salad..."/>
                </div>
                <br/>
                <KtnRangeCalories query={this.props.query}></KtnRangeCalories>
            </form>
        )
    }
}

export default connect((state: stateInterface): stateInterface => state)(MainSearch);
