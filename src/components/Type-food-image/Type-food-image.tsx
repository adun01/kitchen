import React, {useMemo} from 'react';
import ReactTooltip from 'react-tooltip';

import potatoes from '../../svg/potatoes.svg';
import onion from '../../svg/onion.svg';
import cheese from '../../svg/cheese.svg';
import condiment from '../../svg/condiment.svg';
import green from '../../svg/green.svg';
import mayonnaise from '../../svg/mayonnaise.svg';
import salt from '../../svg/salt.svg';
import chiclenLegs from '../../svg/chicken-legs.svg';
import './Type-food-image.scss'

import {KtnProductModel} from '../../models/recipe';

const getIcon = (type: number) => {
    switch (type) {
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
};

export const KtnTypeFoodImage = React.memo(({product}: { product: KtnProductModel }) => {

    const icon = useMemo(() => getIcon(product.iconType), [product.iconType]);

    return (
        <div className="type-food-image">
            <img src={icon}
                 data-tip
                 data-for={'happyFace' + product.iconType}/>
            <ReactTooltip aria-haspopup='true'
                          place="bottom"
                          type="dark"
                          effect="float"
                          id={'happyFace' + product.iconType}>
                Белки: {product.contains.protein}<br/>
                Углеводы: {product.contains.carbohydrates}<br/>
                Жиры: {product.contains.fat}
            </ReactTooltip>
        </div>
    );
});
