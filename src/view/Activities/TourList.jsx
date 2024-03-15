import React from "react";
import img1 from "../../assets/Images/activities/img1.png";
import img2 from "../../assets/Images/activities/img2.png";
import img3 from "../../assets/Images/activities/img3.png";
import img4 from "../../assets/Images/activities/img4.png";
import img5 from "../../assets/Images/activities/img5.png";
import img6 from "../../assets/Images/activities/img6.png";
import img7 from "../../assets/Images/activities/img7.png";
import img8 from "../../assets/Images/activities/img8.png";
import girl404 from "../../assets/girl404.gif";
import { useNavigate } from "react-router-dom";

const TourList = ({ activities }) => {
  const navigate = useNavigate();
  console.log("activitiesDD", activities);

  return (
    <div>
      <section className="tour-list">
        <div className="container-fluid">
          <div className="list1 text-center">
            <div className="row">
              {activities?.map((ele, id) => {
                console.log("jhcgsku", ele);
                return (
                  <div
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 activityThumbnail"
                    key={ele?._id}
                    onClick={() =>
                      navigate(`/activity/${ele?._id}/${ele?.slug}`)
                    }
                  >
                    <div className="guide">
                      <div className="img_wrap">
                        <img src={ele?.image[0]} alt="" className="img-fluid" />
                      </div>
                      <div className="pic-text">
                        <p className="name">{ele?.activityTitle}</p>
                        <h5 className="view">
                          {ele?.duration?.value}
                          {ele?.duration?.unit}
                        </h5>

                        <div className="star">
                          <i
                            data-star={ele?.reviewRating?.toFixed(1)}
                            style={{ fontSize: "30px" }}
                          ></i>
                          <h5 className="rate">
                            {ele?.reviewRating?.toFixed(1)}
                          </h5>
                          <p className="view">({ele?.totalReview} review)</p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <p className="fromDollarPart">From</p>

                          {ele?.activitydiscountedPrice ? (
                            <>
                              <span
                                className="fromDollarPart"
                                style={{
                                  textDecoration: "line-through",
                                  textDecorationColor: "red",
                                  color: "grey",
                                  // marginLeft: "10px",
                                  // marginRight: "10px",
                                  textDecorationThickness: "2px",
                                }}
                              >
                                {ele?.currency?.symbol}{" "}
                                {ele?.activityAdultPrice}
                              </span>
                              <span className="fromDollarPart">
                                {ele?.activityAdultPrice -
                                  ele?.activitydiscountedPrice}
                              </span>
                              <p className="fromDollarPart"></p>

                              <p className="fromDollarPart">per person</p>
                            </>
                          ) : (
                            <>
                              <span className="fromDollarPart">
                                {ele?.currency?.symbol}{" "}
                                {ele?.activityAdultPrice}
                              </span>

                              <p className="fromDollarPart">per person</p>
                            </>
                          )}
                        </div>

                        {/* <div className="from">
                          <h5>
                            From {elem?.currency?.symbol} {activityActualPrice}{" "}
                            <span> per person</span>
                          </h5>
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {activities?.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              aligneles: "center",
            }}
          >
            <img
              src={girl404}
              alt=""
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default TourList;
