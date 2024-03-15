import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';

// import slider1 from '../../assets/Images/slider1.png';
// import slider2 from '../../assets/Images/slider2.png';
// import slider3 from '../../assets/Images/slider3.png';
// import slider4 from '../../assets/Images/slider4.png';
import { Link } from 'react-router-dom';

const TopSightsNearChapel = ({ otherSites, activityTypeId }) => { 
  console.log("otherSites ==otherSites == >> ",otherSites)
  // const slider = [
  //   {
  //     id: 1,
  //     image: slider1,
  //   },
  //   {
  //     id: 2,
  //     image: slider2,
  //   },
  //   {
  //     id: 3,
  //     image: slider3,
  //   },
  //   {
  //     id: 4,
  //     image: slider4,
  //   },
  //   {
  //     id: 5,
  //     image: slider1,
  //   },
  //   {
  //     id: 6,
  //     image: slider2,
  //   },
  //   {
  //     id: 7,
  //     image: slider3,
  //   },
  //   {
  //     id: 8,
  //     image: slider4,
  //   },
  // ];

  return (
    <div>
      <section className="culturalBackgroundPart">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 culturalBackHeading">
              <p>Top cultural sights you can't miss</p>
            </div>
          </div>
          <div className="row sliderMainParent">
            <div className="col-12">
              <div className="swiper myOwnSwiper">
                <div className="swiper-wrapper swiperWraperParent">
                  <Swiper
                    loop
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={40}
                    slidesPerView={4}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={swiper => console.log(swiper)}
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
                    {otherSites.map((item, i) => {
                      return (
                        <SwiperSlide>
                          <div className="swiper-slide" key={i}>
                            <Link to={`/sites/${activityTypeId}/${item?.siteData?._id}`}>
                              <figure className="slideImgParent">
                                <img src={item?.siteData?.image} alt="slider1" />
                                <div className="CardOverlay h-50 "></div>
                                <div className="sliderTextPart">
                                  <p className="sanseverP">{item?.siteData?.siteName}</p>
                                  <p className="elevenActiP">{item?.activityCount} activities</p>
                                </div>
                              </figure>
                            </Link>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopSightsNearChapel;
