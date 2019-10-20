import React, {RefObject, useEffect, useMemo, useState} from 'react';
import {withRouter} from 'react-router';
import {StickyContainer, Sticky} from 'react-sticky';
import VisibilitySensor from 'react-visibility-sensor';

import {KtnRecipeModel, KtnStepModel, KtnProductModel} from '../../models/recipe';

import './Recipe.scss';
import KtnSwiper from '../../components/Swiper/Swiper';
import {KtnTypeFoodImage} from '../../components/Type-food-image/Type-food-image';
import {KtnRangeCalories} from '../../components/Range-calories';
import {getUnsubscribe} from '../../utils';

/**
 * For displaing slide
 */
const typeFood = React.memo((data: { product: KtnProductModel }) => {
    return (
        <div>
            <div className="slide align-items-center d-flex flex-column-reverse justify-content-around text-center">
                <div className="text-black-50 mt-2">
                    <h4>{data.product.name}</h4>
                    {data.product.count && <h6>{data.product.count + ' ' + data.product.unitOfMeasure}</h6>}
                </div>
                <div className="text-center">
                    <KtnTypeFoodImage product={data.product}></KtnTypeFoodImage>
                </div>
            </div>
        </div>
    )
});

const getNameFromUrl: (value: string) => string = (path: string): string => path.split('/')[2];

const options = {
    slidesPerView: 3
};

export const KtnRecipe = withRouter(({location: {pathname}}) => {

    const [recipe, setRecipe] = useState<KtnRecipeModel>();
    const childRef: RefObject<KtnSwiper> = React.createRef();

    let wasNextSlide: boolean = false;

    const goNextSlide: (value: boolean) => void = (value: boolean): void => {
        if (!wasNextSlide && value && childRef.current) {
            wasNextSlide = true;
            childRef.current.nextSlide();
        }
    };

    const getName: string = useMemo(() => getNameFromUrl(pathname), [pathname]);

    useEffect((): () => void => getUnsubscribe(KtnRecipeModel.getOne$(getName)
        .subscribe((recipe: KtnRecipeModel | undefined): void => setRecipe(recipe))), []);

    return (
        <div className="recipe row">
            {recipe && (
                <div className="col-12">
                    <div className="screen row" style={{backgroundImage: 'url(' + recipe.image + ')'}}>
                        <div className="description">
                            {recipe.description}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <div className="slider">
                                <VisibilitySensor onChange={goNextSlide}>
                                    <KtnSwiper ref={childRef}
                                               slideRender={typeFood}
                                               config={options}
                                               slides={recipe.contains}>
                                    </KtnSwiper>
                                </VisibilitySensor>
                            </div>
                            {recipe.steps.map((step: KtnStepModel, index: number) => {
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
                                    {({style}) => (
                                        <div style={{...style}}>
                                            <div className="align-items-center d-flex pt-3">
                                                <KtnRangeCalories filter={{min: 20, max: 40}}
                                                                  onUpdate={() => 1}></KtnRangeCalories>
                                            </div>
                                        </div>
                                    )}
                                </Sticky>
                            </StickyContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
});
