import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import mainbody_bg from '../../assets/Images/travel-guides-baner.png'
import mainbody_bg2 from '../../assets/Images/gel7 2.png'
import Group_35249 from '../../assets/Images/Group 35249.png'
import Group_35248 from '../../assets/Images/Group 35248.png'
import travel_guides_left from '../../assets/Images/travel-guides-left.png'
import Arrow_5 from '../../assets/Images/Arrow 5.png'
import travel_guides_slide1 from '../../assets/Images/travel-guides-slide1.png'
import travel_guides_slide2 from '../../assets/Images/travel-guides-slide2.png'
import travel_guides_slide3 from '../../assets/Images/travel-guides-slide3.png'
import travel_guides_slide4 from '../../assets/Images/travel-guides-slide4.png'
import travel_guides_slide5 from '../../assets/Images/travel-guides-slide5.png'
import travel_guides_slide6 from '../../assets/Images/travel-guides-slide6.png'
import travel_guides_title1 from '../../assets/Images/travel-guides-title1.png'
import travel_guides_title2 from '../../assets/Images/travel-guides-title2.png'
import Rectangle_4386 from '../../assets/Images/Rectangle 4386.png'
import Rectangle_4388 from '../../assets/Images/Rectangle 4388.png'
import travel_featured1 from '../../assets/Images/travel-featured1.png'
import travel_featured2 from '../../assets/Images/travel-featured2.png'
import travel_featured3 from '../../assets/Images/travel-featured3.png'
import travel_featured4 from '../../assets/Images/travel-featured4.png'

function index() {
    return (
        <>
            <section id="travel-guides">
                <div
                    className="travel-guides-baner"
                    style={{ backgroundImage: `url('${mainbody_bg}')`, }}
                >
                    <div className="travel-guides-text-div">
                        <h1 className="travel-guides-text">TRAVEL GUIDES</h1>
                    </div>
                </div>
            </section>
            <section
                id="travel-guides-heading"
                style={{ backgroundImage: `url('${mainbody_bg2}')`, }}
            >
                <div className="travel-content">
                    <h4 className="travel-guides-txt">TRAVEL GUIDES</h4>
                    <div className="row">
                        <div className="col-12 col-lg-6 col-md-12">
                            <div className="travel-image">
                                <img src={travel_guides_left} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-12">
                            <div className="travel-text">
                                <h5 className="travel-day">Paris: A Day in Le Marais</h5>
                                <p className="travel-paragraph">
                                    Le Marais — and the 2nd, 3rd, and 10th Arrondissements — have a
                                    lot to offer foodies, art lovers, and shoppers alike. So, let's
                                    get the day started.
                                </p>
                                <div className="travel-button">
                                    <a href="#" className="travel-read">
                                        READ MORE
                                        <img src={Arrow_5} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="travel-latest">
                <div className="travel-latest-content">
                    <div className="lateslide">
                        <h4 className="travel-guides-stories">LATEST STORIES</h4>
                        {/* <div className="swiper-custom-nav">
                            <img src={Group_35249} className="navRight" />
                            <img src={Group_35248} className="navLeft" />
                        </div> */}
                    </div>
                    {/* <div className="swiper" id="swiper-travel">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src="./images/travel-guides-slide1.png"
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src="./images/travel-guides-slide2.png"
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src="./images/travel-guides-slide3.png"
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src="./images/travel-guides-slide4.png"
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src="./images/travel-guides-slide5.png"
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src="./images/travel-guides-slide6.png"
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Swiper
                        className='myOwnTravSwiper'
                        modules={[Autoplay, Pagination, Navigation]}
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={40}
                        slidesPerView={4}
                        onSlideChange={() => console.log("slide change")}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={{
                            // when window width is >= 640px
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            // when window width is >= 768px
                            768: {
                                spaceBetween: 20,
                                slidesPerView: 3,
                            },

                            300: {
                                spaceBetween: 20,
                                slidesPerView: 1,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src={travel_guides_slide1}
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src={travel_guides_slide2}
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src={travel_guides_slide3}
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src={travel_guides_slide4}
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src={travel_guides_slide5}
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide">
                                <div className="swiper-slider-img">
                                    <img
                                        src={travel_guides_slide6}
                                        alt="Marbella, Spain"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </section>
            <section id="travel-sees">
                <div className="travel-sees-content">
                    <h4 className="travel-sees-txt">MAUI: MUST-SEES AND HIDDEN GEMS</h4>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="travel-sees-image">
                                <img src={travel_guides_title1} />
                            </div>
                            <div className="travel-guides-text-paragraph">
                                <h4>Title</h4>
                                <p>
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout. The
                                    point of using Lorem Ipsum is that it has a mo like).
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="travel-sees-image">
                                <img src={travel_guides_title2} />
                            </div>
                            <div className="travel-guides-text-paragraph">
                                <h4>Title</h4>
                                <p>
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout. The
                                    point of using Lorem Ipsum is that it has a mo like).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="travel-pairs">
                <div className="travel-pairs-content">
                    <div className="travel-pairs-background">
                        <div className="travel-pairs-text">
                            <h5 className="travel-text-pairs"> Paris: A Day in Kamari Mostafa</h5>
                            <p className="travel-pairs-paragraph">
                                <span className="travel-kamari">Kamari Mostafa</span> — and the 2nd,
                                3rd, and 10th Arrondissements — have a lot to offer foodies, art
                                lovers, and shoppers alike. So, let's get the day started.
                            </p>
                        </div>
                        <div className="travel-pairs-image">
                            <div className="travel-bg-image">
                                <img src={Rectangle_4386} />
                            </div>
                            <div className="travel-brdr-image">
                                <img src={Rectangle_4388} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="travel-featured">
                <div className="travel-featured-content">
                    <h4 className="travel-featured-txt">
                        FEATUED TRAVEL GUIDES BY LOCALS AND EXPERTS
                    </h4>
                    <div className="travel-scroll">
                        <div className="mainbox">
                            <div className="travel-featured-image">
                                <img src={travel_featured1} />
                            </div>
                            <div className="travel-featured-text">
                                <h4>LONDON</h4>
                            </div>
                        </div>
                        <div className="mainbox">
                            <div className="travel-featured-image">
                                <img src={travel_featured2} />
                            </div>
                            <div className="travel-featured-text">
                                <h4>UAE</h4>
                            </div>
                        </div>
                        <div className="mainbox">
                            <div className="travel-featured-image">
                                <img src={travel_featured3} />
                            </div>
                            <div className="travel-featured-text">
                                <h4>PARIS</h4>
                            </div>
                        </div>
                        <div className="mainbox">
                            <div className="travel-featured-image">
                                <img src={travel_featured4} />
                            </div>
                            <div className="travel-featured-text">
                                <h4>MAUI</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default index