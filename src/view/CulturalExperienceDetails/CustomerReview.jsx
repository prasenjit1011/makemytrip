import React from "react";
import CustReviewModal from "../../components/Modal/CustReviewModal";
import { useState } from "react";

const CustomerReview = ({ detail, ratingsCompm, id }) => {
  const [custmodal, setCustmodal] = useState(false);

  const handleClick = () => {
    setCustmodal(!custmodal);
  };
  return (
    <>
      <section className="customerReviewSection">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col custRevHead">
              <p>Customer reviews</p>
              <button className='addCustReview'onClick={()=>handleClick()}>Add Review</button>
            </div> */}
          </div>
          <div className="row">
            <div className="col mainInnerRatingPart">
              <div className="reviewFirstPart">
                <p className="reviewSmallHeads">Overall rating</p>
                <p className="custReview">
                  {+detail?.avgRating?.toFixed(1)}
                  <span className="custReviewSpan">/5</span>
                </p>
                <div className="custStarRev">
                  {/* <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" /> */}
                  {/* {ratingsComp} */}
                </div>
                <i
                  data-star={detail?.avgRating?.toFixed(1)}
                  style={{ fontSize: "35px" }}
                ></i>
                {/* <p className="basedRevPart">based on 909 review</p> */}
              </div>
              <div className="reviewSecondPart">
                <p className="reviewSmallHeads">Review summary</p>
                <div className="reviewProgressBarPartParent">
                  <div className="reviewProgressBarPart">
                    <p className="revSumText">Guide / Experience</p>
                    <div className="progress myProgress">
                      <div
                        className="progress-bar progressBarPart"
                        role="progressbar"
                        style={{ width: `${(detail?.guide / 5) * 100}%` }}
                        // aria-valuenow={100}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                    <p className="revRightRate">
                      {detail?.guide?.toFixed(0)}/5
                    </p>
                  </div>

                  <div className="reviewProgressBarPart">
                    <p className="revSumText">Organization</p>
                    <div className="progress myProgress">
                      <div
                        className="progress-bar progressBarPart"
                        role="progressbar"
                        style={{
                          width: `${(detail?.organization / 5) * 100}%`,
                        }}
                        // aria-valuenow={100}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                    <p className="revRightRate">
                      {detail?.organization?.toFixed(0)}/5
                    </p>
                  </div>
                  <div className="reviewProgressBarPart">
                    <p className="revSumText">Service</p>
                    <div className="progress myProgress">
                      <div
                        className="progress-bar progressBarPart"
                        role="progressbar"
                        style={{ width: `${(detail?.service / 5) * 100}%` }}
                        // aria-valuenow={100}
                        // aria-valuemin={0}
                        // aria-valuemax={100}
                      />
                    </div>
                    <p className="revRightRate">
                      {detail?.service?.toFixed(0)}/5
                    </p>
                  </div>
                  <div className="reviewProgressBarPart">
                    <p className="revSumText">Value For Money</p>
                    <div className="progress myProgress">
                      <div
                        className="progress-bar progressBarPart"
                        style={{
                          width: `${(detail?.valueForMoney / 5) * 100}%`,
                        }}
                        role="progressbar"
                        // aria-valuenow={0}
                        // aria-valuemin={0}
                        // aria-valuemax={0}
                      />
                    </div>
                    <p className="revRightRate">
                      {detail?.valueForMoney?.toFixed(0)}/5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {custmodal && <CustReviewModal closeModal={setCustmodal} id={id} />}
    </>
  );
};

export default CustomerReview;
