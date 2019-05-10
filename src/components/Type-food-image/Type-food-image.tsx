import React, {Component, ReactNode} from 'react';

import potatoes from '../../svg/potatoes.svg';
import onion from '../../svg/onion.svg';
import cheese from '../../svg/cheese.svg';
import condiment from '../../svg/condiment.svg';
import green from '../../svg/green.svg';
import mayonnaise from '../../svg/mayonnaise.svg';
import salt from '../../svg/salt.svg';
import chiclenLegs from '../../svg/chicken-legs.svg';


/**
 * displaing icon svg for type food
 */
export default class KtnTypeFoodImage extends Component<{
    type: number
}> {

    public switchIcon() {
        switch (this.props.type) {
            case 1: {
                return potatoes;
            }
            case 2: {
                return onion;
            }
            case 3: {
                return chiclenLegs;
            }
            case 4: {
                return cheese;
            }
            case 5: {
                return mayonnaise;
            }
            case 6: {
                return salt;
            }
            case 7: {
                return condiment;
            }
            case 8: {
                return green;
            }
        }
    }

    render(): ReactNode {
        return (
            <div>
                <img src={this.switchIcon()} alt=""/>
            </div>
        );
    }
}
