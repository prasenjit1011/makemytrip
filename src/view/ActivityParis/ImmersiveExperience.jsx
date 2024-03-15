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

const ImmersiveExperience = () => {
  const tourlist = [
    {
      id: 1,
      image: img1,
      title: "Architecture",
    },
    
    {
      id: 1,
      image: img2,
      title: "Architecture",
    },
    
    {
      id: 1,
      image: img3,
      title: "Architecture",
    },
    
    {
      id: 1,
      image: img4,
      title: "Architecture",
    },
    
    {
      id: 1,
      image: img5,
      title: "Architecture",
    },
    
    {
      id: 1,
      image: img6,
      title: "Architecture",
    },
    
    {
      id: 1,
      image: img7,
      title: "Architecture",
    },

    {
      id: 1,
      image: img8,
      title: "Architecture",
    },
    
  ];
  return (
    
        <section className="tour-list my-5 pb-5">
          <div className="container-fluid">
            <div className="list1 text-center">
              <h4 className="headingTop">
                {" "}
                <span className="cyanText"> Immersive</span> Experiences
              </h4>
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
                style={{ height: "20rem"}}
              >
                <div className="">
                  {tourlist.map((elem) => {
                    const { image, title} = elem;
                    return (
                      <SwiperSlide>
                        <div
                          className="position-relative"
                        //   style={{ zIndex: "-1" }}
                        >
                          <img src={image} alt="" className="img-fluid"/>
                          <p className="ImmersiveTitleText" >{title} </p>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </div>
          </div>
        </section>
   
  );
};

export default ImmersiveExperience;
