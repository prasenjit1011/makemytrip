import React from "react";
import MainLoader from "../../components/Loaders/MainLoader";
import { Link } from "react-router-dom";
import girl404 from "../../assets/girl404.gif";
import robot404 from "../../assets/robot404.gif";
import noResult from "../../assets/noResultAnimation.gif";

const TopActivityCity = ({ activites }) => {
  console.log("activitesTop", activites);
  return (
    <div>
      <section className="tabingPart">
        {/* <MainLoader isLoading={isLoading} /> */}
        <div className="custContain">
          <h4 className="headingTop">
            {activites?.length === 8
              ? "You can see this also"
              : "Top Activities"}
          </h4>
          <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              {/* <div className="row">
                                <div className="col-12">
                                    <p className="mainSectionHeadingPart">Unforgettable {bannerData?.activity_Type} experience</p>
                                </div>
                            </div> */}
              <div className="culturalExperiencePart row">
                {activites &&
                  activites?.map((item, idx) => {
                    console.log("itemmm", item);
                    return (
                      <div
                        className="col-xl-3 col-lg-4 col-md-6 col-9"
                        key={idx}
                      >
                        <div className="ratingInsidePartAnchor">
                          <div className="ratingInsidePart">
                            <Link
                              style={{ textDecoration: "none" }}
                              className="ratingTextPart"
                              to={`/activity/${item._id}/${item.slug}`}
                            >
                              {/* <p className="guidedTourText">{item.categoriesData?.categoryName}</p> */}
                              <p className="edinBurgText">
                                {item.activityTitle}
                              </p>
                              <p className="timeTextPart">
                                {item?.tourDuration?.value}{" "}
                                {item?.tourDuration?.unit}
                              </p>

                              <div>
                                <i
                                  data-star={item?.reviewRating?.toFixed(1)}
                                  className="reviewCardStar"
                                ></i>
                                <span className="reviewText">
                                  {+item?.reviewRating?.toFixed(1)}
                                </span>
                                <span className="numberOfReviews">
                                  ({item?.totalReview} Reviews)
                                </span>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <p className="fromDollarPart">From</p>

                                {item?.activitydiscountedPrice ? (
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
                                      {item?.currency?.symbol}{" "}
                                      {item?.activityAdultPrice}
                                    </span>
                                    <span className="fromDollarPart">
                                      {item?.activityAdultPrice -
                                        item?.activitydiscountedPrice}
                                    </span>
                                    <p className="fromDollarPart"></p>

                                    <p className="fromDollarPart">per person</p>
                                  </>
                                ) : (
                                  <>
                                    <span className="fromDollarPart">
                                      {item?.currency?.symbol}{" "}
                                      {item?.activityAdultPrice}
                                    </span>

                                    <p className="fromDollarPart">per person</p>
                                  </>
                                )}
                              </div>

                              {}
                            </Link>
                            <figure className="ratingImgPart">
                              <Link to={`/activity/${item._id}/${item.slug}`}>
                                <img
                                  src={item?.image[0]}
                                  alt="activity-img-not-found"
                                />
                              </Link>
                            </figure>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {activites?.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={girl404}
                    alt=""
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopActivityCity;
