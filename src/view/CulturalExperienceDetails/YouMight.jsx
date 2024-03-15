import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

const YouMight = ({ detail, cards }) => {
  const navigate = useNavigate();
  console.log("")
  return (
    <>
      <section className="youMightSection py-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col mightHeadingPart">
              <p>You might also like</p>
            </div>
          </div>

          <div className="row">
            <div className="col mightCartSection">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  550: {
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
                  1400: {
                    slidesPerView: 5,
                    spaceBetween: 25,
                  },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="myMightSwiper"
              >
                {detail?.catDetails?.othersActivity?.map((elem, i) => {
                  console.log("dfguhsfdjks", elem);
                  // const { id, image, title, desc, time, star, review, price } = elem;
                  // console.log('detail?.catDetails?.othersActivity?', detail?.catDetails?.othersActivity);
                  // const { image, activityTitle, time, activityActualPrice } = elem;
                  return (
                    <SwiperSlide>
                      <div
                        className="card cardParent"
                        key={i}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/activity/${elem?._id}/${elem?.slug}`);
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <img
                          src={elem?.image?.[0]}
                          alt="title"
                          className="card-img"
                        />
                        {/* <i className="fa-regular fa-heart cardHeart" /> */}
                        <div className="cardOverlayPart">
                          <p className="entryTic">{elem?.activityTitle}</p>
                          {/* <p className="fromSmallPart">{desc}</p> */}
                          {/* <p className="smallGardenPart">
                        Gardens w/ Transportation
                      </p> */}
                          {/* <p className="ideaTimePArt">{elem?.time}</p> */}
                          {/* <div className="smallRevPart">
                        <div className="reviewPart">
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                          <i className="fa-solid fa-star" />
                        </div>
                        <p className="smallWordRev">
                          {star}
                          <span className="smallWordRevSpan">({review})</span>
                        </p>
                      </div> */}
                          <p className="smallPrice">
                            {elem?.currency?.symbol}

                            {/* {detail?.participentType?.map((ele, id) => {
                              console.log("bjhgjkj", ele);
                              if (ele?.pertype === "Adult") {
                                return ele?.price;
                              }
                            })} */}
                            {elem?.activitydiscountedPrice > 0
                              ? (
                                  elem?.activityAdultPrice -
                                  elem?.activitydiscountedPrice
                                )?.toFixed(2)
                              : elem?.activityAdultPrice?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                {/* <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YouMight;
