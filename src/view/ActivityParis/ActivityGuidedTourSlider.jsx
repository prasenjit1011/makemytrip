import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";

import img1 from "../../assets/Images/activities/img1.png";
import img2 from "../../assets/Images/activities/img2.png";
import img3 from "../../assets/Images/activities/img3.png";
import img4 from "../../assets/Images/activities/img4.png";
import img5 from "../../assets/Images/activities/img5.png";
import img6 from "../../assets/Images/activities/img6.png";
import img7 from "../../assets/Images/activities/img7.png";
import img8 from "../../assets/Images/activities/img8.png";
import { Link, useNavigate } from "react-router-dom";
import WishListComp from "../../components/WishListComp";

const ActivityGuidedTourSlider = ({ activites = [] }) => {
  const navigate = useNavigate()
  const tourlist = [
    {
      id: 1,
      image: img1,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 2,
      image: img2,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 3,
      image: img3,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 4,
      image: img4,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 5,
      image: img5,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 6,
      image: img6,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 7,
      image: img7,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 8,
      image: img8,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
  ];

  return (
    <div>
      <section className="tour-list my-5">
        <div className="container-fluid">
          <div className="list1 text-center">
            <h4 className="headingTop">Top Activities</h4>
            <Swiper
              loop
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              spaceBet
              spaceBetween={40}
              slidesPerView={6}
              onSlideChange={() => console.log("slide change")}
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
              {
                activites?.length > 0
                  ?

                  <div className="culturalExperiencePart row">
                    {activites?.map((item, idx) => {
                      // const { id, image, title, desc, price } = elem;
                      return (
                        <SwiperSlide>
                          <div
                            className=""
                            key={item._id}
                            onClick={() => navigate(`/activity/${item._id}/${item.slug}`)}
                          >
                            <div className="guide">
                              <img src={item.image[0]} alt="" className="img-fluid" />
                              <div className="pic-text">
                                <p className="rate">{item.activityTitle}</p>
                                <h5 className="view">{item.description}</h5>
                                <div className="star">
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                  <i className="fa-solid fa-star"></i>
                                  <h5 className="rate">4.8</h5>
                                  <p className="view">(4,545 review)</p>
                                </div>
                                <div className="from">
                                  <h5>
                                    From {item.activityActualPrice} <span> per person</span>
                                  </h5>
                                </div>
                              </div>
                            </div>

                            {/* {tempData?.map((item, idx) => { */}

                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                  :
                  "No Activity Found"
              }
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivityGuidedTourSlider;
