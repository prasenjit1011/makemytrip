import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";

import slider1 from "../../assets/Images/slider1.png";
import slider2 from "../../assets/Images/slider2.png";
import slider3 from "../../assets/Images/slider3.png";
import slider4 from "../../assets/Images/slider4.png";
import { Link } from "react-router-dom";
import { useHome } from "../../Context/HomeContext";
import ActivityService from "../../Service/ActivityService";

const CulturalSites = ({ data }) => {
  const [sities, setAllSities] = useState([]);
  const [sitestitle, setTitle] = useState("");
  const { setCurrentTabId, currentTabId, section, bannerData } = useHome();
  const [backImage, setBackImg] = useState(""); 
  console.log("sities",sities)
  const fetchSities = () => {
    ActivityService.getTypeAgainstSities(currentTabId)
      .then((res) => {
        if (res?.status) {
          if (res.data) {
            setAllSities(res?.data?.activities);

            setTitle(res?.data?.title);
            setBackImg(res?.data?.image);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchSities();
  }, [currentTabId]);

  // const type = new URLSearchParams(window.location.search).get("currentTab")

  return (
    <div>
      <section
        className="culturalBackgroundPart"
      >
        <figure className="ciltActivityFig">
          <img src={backImage} alt="..." />
        </figure>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 culturalBackHeading">
              <p>{sitestitle}</p>
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
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={40}
                    slidesPerView={6}
                    // onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    breakpoints={{
                      // when window width is >= 992px
                      992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                      // when window width is >= 768px
                      768: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                      },
                      // when window width is >= 300px

                      300: {
                        spaceBetween: 20,
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {sities?.map((item, i) => {
                      console.log("gdghgfkla", item);
                      return (
                        <SwiperSlide key={item._id}>
                          <div className="swiper-slide">
                            <Link to={`/sites/${currentTabId}/${item._id}`}>
                              <figure className="slideImgParent">
                                <img src={item.siteData?.image} alt="slider1" />
                                <div className="CardOverlay h-50 "></div>
                                <div className="sliderTextPart">
                                  <p className="sanseverP">
                                    {i + 1}. {item.siteData?.siteName}
                                  </p>
                                  <p className="elevenActiP">
                                    {item.activityCount} activities
                                  </p>
                                </div>
                              </figure>
                            </Link>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                    {/* <SwiperSlide>
                      <div className="swiper-slide">
                        <Link to="/activities">
                          <figure className="slideImgParent">
                            <img src={slider2} alt="" />
                            <div className="CardOverlay h-50 "></div>
                            <div className="sliderTextPart">
                              <p className="sanseverP">1.Sansevero Chapel</p>
                              <p className="elevenActiP">11 activities</p>
                            </div>
                          </figure>
                        </Link>
                      </div>
                    </SwiperSlide> */}
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

export default CulturalSites;
