import React, {Component, ReactNode} from 'react';

import Swiper from 'swiper';
import 'swiper/src/swiper.scss';

interface Props {
    slideRender: Function,
    config: {
        slidesPerView: number
    },
    data: any[]
}

/**
 * Displaing swiper
 */
export default class KtnSwiper extends Component<Props, {
    slides: any[],
    offset: number
}> {

    constructor(props: Props) {
        super(props);
        this.state = {
            slides: this.props.data,
            offset: 0
        };
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
    }

    render(): ReactNode {
        const Render = this.props.slideRender;
        return (
            <div className="w-100">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.state.slides.map((slide, index) => (
                            <div className="swiper-slide"
                                 key={index}
                                 style={{left: this.state.offset + 'px'}}
                            >
                                <Render product={slide}></Render>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
