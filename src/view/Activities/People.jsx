import React from "react";

const People = () => {
  return (
    <div>
      <section className="people">
        <div className="container-fluid">
          <h4>
            What <span>people</span> are saying about
            <span className="ml-2">Sansevero Chapel</span>
          </h4>
          <div className="rating">
            <p>Overall rating</p>
            <div className="STAR">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <span className="four">4.4/5</span>
            </div>
            <span className="grey">based on 276,581 reviews</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default People;
