import React, { useCallback, useEffect, useState } from "react";

// import bannerImg1 from '../../assets/Images/bannerPart.png';
// import guideTour1 from '../../assets/Images/guideTour1.png';
// import guideTour2 from '../../assets/Images/guideTour2.png';
// import guideTour3 from '../../assets/Images/guideTour3.png';
// import guideTour4 from '../../assets/Images/guideTour4.png';
// import guideTour5 from '../../assets/Images/guideTour5.png';
// import guideTour6 from '../../assets/Images/guideTour6.png';
// import guideTour7 from '../../assets/Images/guideTour7.png';
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
// import guideTour8 from '../../assets/Images/guideTour8.png';
import WishListComp from "../../components/WishListComp";
import ActivityService from "../../Service/ActivityService";
import { useHome } from "../../Context/HomeContext";
import MainLoader from "../../components/Loaders/MainLoader";
import { useAuth } from "../../Context/AuthContextProvider";
import { toast } from "react-hot-toast";
import {
  addToWishlist,
  getAllActivitiesAgainstType,
} from "../../API_HELPERS/apiHelpers";
import NewWishListModal from "../../components/Modal/NewWishListModal";

function Activity({ data }) {
  const { setCurrentTabId, currentTabId, section, bannerData } = useHome();
  const { loginStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [activitytitle, setActivityTitle] = useState("");

  // const discountedPriceMemo = useCallback((price) => {
  //   if (price?.offerDetails) {
  //     return (Number(price.activityActualPrice)) * (100 - Number(price?.offerDetails?.discountPercentage)) / 100;
  //   } else {
  //     return ""
  //   }
  // }, [price]);

  const fetchActivities = async (tabId) => { 
    // ActivityService.getTypeAgainstActivities(tabId)
    //   .then(res => {
    //     if (res.status) {
    //       setActivities(res?.data);
    //       console.log('ACTIVITIES', res?.data);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(() => {});

    try {
      setIsLoading(true);
      let res;
      if (loginStatus) {
        res = await getAllActivitiesAgainstType(tabId);
    
      } else {
        res = await ActivityService.getTypeAgainstActivities(tabId);
      }
      console.log("fucking responce", res);
      if (res.status) {
        setActivities(res?.data?.activities);
        setActivityTitle(res?.data?.title);
      } else {
        console.log("ERROR FETCHING ACTIVITIES AGAINST TYPE", res);
      }
    } catch (error) {
      console.log("ERROR FETCHING ACTIVITIES AGAINST TYPE", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActivities(currentTabId);
  }, [currentTabId, loginStatus]);

  return (
    <section className="tabingPart" style={{ paddingTop: "70px" }}>
      <MainLoader isLoading={isLoading} />
      <div className="custContain">
        <div className="tab-content">
          <div className="tab-pane active" id="tabs-1" role="tabpanel">
            <div className="row">
              <div className="col-12">
                <p className="mainSectionHeadingPart"> <h1> activitytitle </h1></p>
                <p className="mainSectionHeadingPart">{activitytitle}</p>
              </div>
            </div>
            <div className="culturalExperiencePart row">
              {activities?.map((item, idx) => {
                return (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-8" key={idx}>
                    <div className="ratingInsidePartAnchor">
                      <div className="ratingInsidePart">
                        <Link
                          style={{ textDecoration: "none" }}
                          className="ratingTextPart"
                          to={`/activity/${item._id}/${item.slug}`}
                        >
                          <p className="guidedTourText">
                            {item.categoriesData?.categoryName}
                          </p>
                          <p className="edinBurgText">{item.activityTitle}</p>
                          <p className="timeTextPart">
                            {item?.tourDuration?.value}{" "}
                            {item?.tourDuration?.unit}
                          </p>

                          <div>
                            {/* {Array.from({ length: +Math.trunc(item?.review) }, () => 2)?.map((item, i) => {
                              return <i key={i + 1} className="fa-solid fa-star starRatingPart"></i>;
                            })}
                            {Array.from(
                              {
                                length: String(item?.review).includes('.') ? 1 : 0,
                              },
                              () => 2
                            )?.map((item, i) => {
                              return <i key={i + 1} className="fa-regular fa-star-half-stroke starRatingPart"></i>;
                            })}
                            {Array.from(
                              {
                                length: String(item?.review).includes('.')
                                  ? 5 - (Math.trunc(item?.review) + 1)
                                  : 5 - Math.trunc(item?.review),
                              },
                              () => 2
                            )?.map((item, i) => {
                              return <i key={i + 1} className="fa-regular fa-star starRatingPart"></i>;
                            })} */}
                            <i data-star={item?.review?.toFixed(1)}></i>
                            <span className="reviewText">
                              {+item?.review?.toFixed(1)}
                            </span>
                            <span className="numberOfReviews">
                              ({item?.totalReview} Reviews)
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <p className="fromDollarPart">From</p>
                            {/* {item?.offerDetails ? ( */}
                            {item?.activitydiscountedPrice ? (
                              <>
                                <span
                                  className="fromDollarPart"
                                  style={{
                                    textDecoration: "line-through",
                                    textDecorationColor: "red",
                                    color: "grey",

                                    textDecorationThickness: "2px",
                                  }}
                                >
                                  {item?.currency?.symbol}{" "}
                                  {/* {item.activityActualPrice} */}
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
                                <span
                                  className="fromDollarPart"
                                  // style={{
                                  //   textDecoration: "line-through",
                                  //   textDecorationColor: "red",
                                  //   color: "grey",
                                  //   marginLeft: "10px",
                                  //   marginRight: "10px",
                                  //   textDecorationThickness: "2px",
                                  // }}
                                >
                                  {item?.currency?.symbol}{" "}
                                  {/* {item.activityActualPrice} */}
                                  {item?.activityAdultPrice}
                                </span>

                                <p className="fromDollarPart">per person</p>
                              </>
                            )}
                            {/* {item?.offerDetails ? (
                              <span className="fromDollarPart">
                                {item?.currency?.symbol}{" "}
                                {(Number(item?.activityActualPrice) *
                                  (100 -
                                    Number(
                                      item?.offerDetails?.discountPercentage
                                    ))) /
                                  100}
                                {item?.participentType?.map((ele, ind) => {
                                  console.log("kkkhd", ele);
                                  if (ele.pertype === "Adult") {
                                    return ele.price;
                                  }
                                })}
                                
                              </span>
                            ) : (
                              <span
                                className="fromDollarPart"
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                {item?.currency?.symbol}{" "}
                                {item.activityActualPrice}
                                {item?.participentType?.map((ele,ind)=>{
                                    console.log("kkkhd",ele)
                                    if(ele.pertype==="Adult"){
                                      return (ele.price-(ele.price*item.discountPercentage/100))
                                    }
                                  })}
                              </span>

                            )} */}
                          </div>
                        </Link>
                        <figure className="ratingImgPart">
                          <Link to={`/activity/${item._id}/${item.slug}`}>
                            <img
                              src={item?.image[0]}
                              alt="activity-img-not-found"
                            />
                          </Link>
                          <i
                            className="fa-regular fa-heart"
                            style={{ cursor: "pointer", color: "#f95d12" }}
                            onClick={() => {
                              // if (!loginStatus) {
                              //   return setShowLoginModal(true);
                              // }
                              // setShowWishlistModal(true);
                              setShowWishlist(true);
                            }}
                          />
                          <WishListComp
                            item={item}
                            fetchActivity={fetchActivities.bind(
                              null,
                              currentTabId
                            )}
                            showEmptyHeart={item?.isWishlist}
                            folderId={item?.wishlist?.folderId}
                          />

                          {/* {showWishlist &&
                            createPortal(<NewWishListModal />, document.getElementById('wishlistOverlay'))} */}
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
    </section>
  );
}

export default Activity;
