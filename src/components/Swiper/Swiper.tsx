import React, {Component, ReactNode} from 'react';

import Swiper from 'swiper';
import 'swiper/src/swiper.scss';

interface Props {
    slideRender: Function,
    config: {
        slidesPerView: number
    },
    onAfterInit?: (swiper: Swiper) => void,
    slides: any[]
}

/**
 * Displaing swiper
 */
export default class KtnSwiper extends Component<Props, {
    slides: any[],
    swiper: Swiper | null,
    offset: number
}> {

    constructor(props: Props) {
        super(props);
        this.state = {
            slides: this.props.slides,
            offset: 0,
            swiper: null
        };
    }

    public nextSlide(): void {
        this.state.swiper && this.state.swiper.slideNext();
    }

    /**
     * initializing the swipe
     */
    componentDidMount(): void {
        const self = this;
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: this.props.config.slidesPerView,
            virtual: {
                slides: self.state.slides,
                renderExternal(data) {
                    self.setState({
                        ...data
                    });
                }
            },
        });
        this.setState((state) => ({
            ...state,
            swiper
        }));
    }

    render(): ReactNode {
        const RenderSlide = this.props.slideRender;
        return (
            <div className="w-100">
                <div className="swiper-container py-5">
                    <div className="swiper-wrapper">
                        {this.state.slides.map((slide, index) => (
                            <div className="swiper-slide"
                                 key={index}
                                 style={{left: this.state.offset + 'px'}}
                            >
                                <RenderSlide product={slide}></RenderSlide>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
