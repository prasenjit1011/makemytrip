import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";

import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";
// import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";
// import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";
// import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";
// import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";
// import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";
// import SightsImage1 from "../../assets/Images/actvitiesParis/SightsImg1.png";


const ActivityGuidedTourSlider = () => {
  const tourlist = [
    {
      id: 1,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
   
    {
      id: 2,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
   
    {
      id: 3,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
   
    {
      id: 1,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
   
    {
      id: 4,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
   
    {
      id: 5,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
   
    {
      id: 6,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
    {
      id: 7,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },
    {
      id: 8,
      image: SightsImage1,
      title: "Sansevero Chapel",
      subtitle: "11 activities",
    
    },

   
  ];

  return (
    <div>
      <section className="tour-list my-5">
        <div className="container-fluid">
          <div className="list1 text-center">
            <h4 className="headingTop">Top sights in <span className="cyanText"> Paris </span></h4>
            <Swiper
              loop
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              spaceBet
              spaceBetween={40}
              slidesPerView={4}
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
              <div className="">
                {tourlist.map((elem) => {
                  const { id, image, title, subtitle } = elem;
                  return (
                    <SwiperSlide>
                      <div className="SightsInParisWrapper" key={id}>
                        <img
                          src={image}
                          alt=""
                          className="img-fluid sightsInParisImage"
                        />
                        <div className="pic-text">
                          <p className="SightsInParisTitle">{title}</p>
                          <h5 className="SightsInParisDesc">{subtitle}</h5>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivityGuidedTourSlider;
