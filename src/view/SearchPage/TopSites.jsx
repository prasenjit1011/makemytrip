import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import bookingPicOne from '../../../src/assets/Images/bookingPicOne.png';


const TopSites = () => {
    return (
        <div>
            <div className='container mt-4'>
                <p className='topActHead'>Top sights in New Delhi</p>
                <div className="topSightSwipeDiv">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        breakpoints={{
                            415: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        navigation={true}
                        modules={[Navigation]}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        className="myTopSightSwi"
                    >
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link to="/">
                                <div className='topActCard'>
                                    <figure className='topCardActFig'>
                                        <img src={bookingPicOne} alt="bookDemo" />
                                    </figure>
                                    <div className='diwaDiv'>
                                        <span className='diwaTextSpan'>1. Diwan-i-Am</span>
                                    </div>
                                    <div className='threeActDiv'>
                                        <span className='threeActSpan'>3 activites</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </div>
    )
}

export default TopSites
