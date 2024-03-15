import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewRating from "./ReviewRating";
import WishListComp from "../../components/WishListComp";

const TopActivies = ({ tempData, searchData, getSearchData }) => { 
  console.log("searchData==========================",searchData)
  const navigate = useNavigate();
  return (
    <div>
      <div className="container mt-4">
        <p className="topActHead">Top activities</p>
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <div className="row">
              <div className="col-12"></div>
            </div>
            <div className="culturalExperiencePart row">
              {/* {tempData?.map((item, idx) => { */}
              {searchData?.Top_activity?.map((item, idx) => {
                return (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-8" key={idx}>
                    <div className="ratingInsidePartAnchor">
                      <div className="ratingInsidePart">
                        <Link
                          style={{ textDecoration: "none" }}
                          className="ratingTextPart"
                          to={`/activity/${item._id}/${item.slug}`}
                        >
                          <p className="edinBurgText">'{item.activityTitle}</p>
                          <p className="timeTextPart">
                            {item?.tourDuration?.value}{" "}
                            {item?.tourDuration?.unit}
                          </p>
                          <div>
                            
                            <i data-star={item?.reviewRating?.toFixed(1)}></i>
                            <span className="numberOfReviews">
                              ({item?.totalReview} Reviews)
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
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
                                  {(
                                    item?.activityAdultPrice -
                                    item?.activitydiscountedPrice
                                  ).toFixed(2)}
                                </span>
                                <p className="fromDollarPart"></p>

                                <p className="fromDollarPart">per person</p>
                              </>
                            ) : (
                              <>
                                <span className="fromDollarPart">
                                  {item?.currency?.symbol}{" "}
                                  {item?.activityAdultPrice?.toFixed(2)}
                                </span>

                                <p className="fromDollarPart">per person</p>
                              </>
                            )}
                          </div>
                        </Link>
                        <figure className="ratingImgPart">
                          <img
                            src={item?.image[0]}
                            alt="Image not found"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/activity/${item._id}/${item.slug}`);
                            }}
                          />
                          <span>
                            <WishListComp
                              item={item}
                              fetchActivity={getSearchData}
                              showEmptyHeart={item?.isWishlist}
                              folderId={item?.wishlistData?.folderId}
                            />
                          </span>
                        </figure>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopActivies;
