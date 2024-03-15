import React from "react";

const Review = () => {
  return (
    <div>
      <section className="REVIEW">
        <div className="container-fluid">
          <div className="STAR">
            <div className="review">
              <div className="date">
                <div className="icon">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>13/05/2023</p>
              </div>
              <p>
                Julien was our guide and he was amazing! The tour was so much
                fun! It was the first thing we did after landing and a great
                jump start to seeing the city! Highly recommend! Julien knew all
                of the stops to take great photos of us!
              </p>
            </div>
            <div className="Review-sara">
              <p>
                Review <span> Sara </span>
              </p>
              <span>
                From Paris: Versailles Skip-the-Line Tour & Gardens Access
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
