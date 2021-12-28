import React from 'react';

import Slider from "react-slick";
import styles from './Carousel.module.scss';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <Slider className={styles.carousel} {...settings}>
            <div className={styles.wrap}>
                <a>
                    <img src="/images/slider-badging.jpg" alt="" />
                </a>
            </div>

            <div className={styles.wrap}>
                <a>
                    <img src="/images/slider-scale.jpg" alt="" />
                </a>
            </div>

            <div className={styles.wrap}>
                <a>
                    <img src="/images/slider-badag.jpg" alt="" />
                </a>
            </div>

            <div className={styles.wrap}>
                <a>
                    <img src="/images/slider-scales.jpg" alt="" />
                </a>
            </div>
        </Slider>
    )
}

export default Carousel
