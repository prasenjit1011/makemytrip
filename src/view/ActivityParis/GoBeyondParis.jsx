import React from "react";

import img1 from "../../assets/Images/activities/img1.png";
import img2 from "../../assets/Images/activities/img2.png";
import img3 from "../../assets/Images/activities/img3.png";
import img4 from "../../assets/Images/activities/img4.png";
import img5 from "../../assets/Images/activities/img5.png";
import img6 from "../../assets/Images/activities/img6.png";
import img7 from "../../assets/Images/activities/img7.png";
import img8 from "../../assets/Images/activities/img8.png";

const GoBeyondParis = (props) => {
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

  ];

  return (
    <section className="tour-list my-5">
      <div className="container-fluid">
        <div className="list1 text-center">
          <h4 className="headingTop">Go Beyond Paris</h4>
        
            <div className="row">
              {tourlist.map((elem) => {
                const { id, image, title, desc, price } = elem;
                return (
                  <div  className="col-lg-3 col-md-6 col-12 " key={id}>
                    <div className="guide">
                      <img src={image} alt="" className="img-fluid" />
                      <div className="pic-text">
                        <p className="rate">{title}</p>
                        <h5 className="view">{desc}</h5>
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
                            From {price} <span> per person</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
         
        </div>
      </div>
    </section>
  );
};

export default GoBeyondParis;
