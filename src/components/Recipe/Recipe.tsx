import React, {Component, ReactNode} from 'react';
import {Range} from 'react-input-range';
import {StickyContainer, Sticky} from 'react-sticky';
import classNames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import Swiper from 'swiper';

import {recipeInterface, productInterface, step} from '../../store';
import './Recipe.scss';
import KtnSwiper from '../Swiper/Swiper';
import KtnTypeFoodImage from '../Type-food-image/Type-food-image';
import KtnRangeCalories from '../Range-calories';

/**
 * For displaing slide
 */
function slideRender(data: { product: productInterface }): ReactNode {
    return (
        <div>
            <div className="slide align-items-center d-flex flex-column-reverse justify-content-around text-center">
                <div className="text-black-50 mt-2">
                    <h4>{data.product.name}</h4>
                    <h6>{data.product.count + ' ' + data.product.unitOfMeasure}</h6>
                </div>
                <div className="text-center">
                    <KtnTypeFoodImage type={data.product.iconType}></KtnTypeFoodImage>
                </div>
            </div>
        </div>
    )
}

interface KtnRecipeStateInterface extends Range {
    swiper: Swiper | null,
    wasNextSlide: boolean
}

export default class KtnRecipe extends Component<{
    recipe: recipeInterface
}, KtnRecipeStateInterface> {

    constructor(props: {
        recipe: recipeInterface
    }) {
        super(props);
        const totalContains = this.props.recipe.contains.reduce((prev, product: productInterface) => {
            return {
                protein: prev.protein + this._prepareNumber(product.contains.protein),
                carbohydrates: prev.carbohydrates + this._prepareNumber(product.contains.carbohydrates),
                fat: prev.fat + this._prepareNumber(product.contains.fat)
            }
        }, {
            protein: 0,
            carbohydrates: 0,
            fat: 0
        });

        const oneProcent = (totalContains.protein + totalContains.carbohydrates + totalContains.fat) / 100,
            proteins = +parseFloat(totalContains.protein / oneProcent + '').toFixed();

        this.state = {
            min: proteins,
            max: proteins + Number((totalContains.carbohydrates / oneProcent).toFixed()),
            swiper: null,
            wasNextSlide: false
        };
    }

    private _prepareNumber(value: number): number {
        return parseInt(value * 100 + '');
    }

    public getClassesForSticky(isSticky: boolean) {
        return classNames({
            'vh-100': isSticky,
            'align-items-center': true,
            'd-flex': true
        });
    }

    public onChange(value: boolean): void {
        if (value) {
            if (!this.state.wasNextSlide) {
                setTimeout(() => {
                    this.state.swiper && this.state.swiper.slideNext();
                    this.setState({
                        ...this.state,
                        wasNextSlide: true
                    });
                });
            }
        }
    }

    public onAfterInitSwiper(swiper: Swiper) {
        this.setState({
            ...this.state,
            swiper: swiper
        });
    }

    render(): ReactNode {
        return (
            <div className="recipe">
                <div className="screen" style={{
                    backgroundImage: 'url(' + this.props.recipe.image + ')'
                }}>
                    <div className="description">
                        {this.props.recipe.description}
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row d-flex">
                        <div className="col-8">
                            <div className="slider my-5">
                                <VisibilitySensor onChange={this.onChange.bind(this)}>
                                    <KtnSwiper slideRender={slideRender}
                                               config={{
                                                   slidesPerView: 3
                                               }}
                                               onAfterInit={this.onAfterInitSwiper.bind(this)}
                                               data={this.props.recipe.contains}></KtnSwiper>
                                </VisibilitySensor>
                            </div>
                            {this.props.recipe.steps.map((step: step, index: number) => {
                                return (
                                    <div className="d-flex p-5"
                                         key={step.id}>
                                        <div className="text-center w-50">
                                            <img src={step.image} className="w-75"/>
                                        </div>
                                        <div className="p-3 text-black-50 w-50">
                                            <h5>
                                                <b className="mr-2">{index + 1}.</b>{step.description}
                                            </h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-4 bg-light">
                            <StickyContainer className="w-100 h-100">
                                <Sticky>
                                    {({
                                          style,
                                          isSticky,
                                          wasSticky,
                                          distanceFromTop,
                                          distanceFromBottom,
                                          calculatedHeight
                                      }) => (
                                        <div style={{...style}}>
                                            <div className={this.getClassesForSticky(isSticky)}>
                                                <KtnRangeCalories query={this.state}
                                                                  forRecipe={true}></KtnRangeCalories>
                                            </div>
                                        </div>
                                    )}
                                </Sticky>
                            </StickyContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
