import React, { useEffect, useState } from "react";
import BannerThings from "../Activities/BannerThings";
import { Link, useNavigate } from "react-router-dom";
import ReviewRating from "./ReviewRating";
import WishListComp from "../../components/WishListComp";

const AllActivity = ({
  tempData = [],
  activities,
  searchData = [],
  getSearchData,
}) => {
  // pagination start
  const originalData = searchData;

  const [paginateData, setPaginateData] = useState([]);
  const noDataInPage = 8;
  const totalNoOfPage = Math.ceil(originalData?.length / noDataInPage);
  const [currPage, setCurrPage] = useState(1);
  const [initialIndex, setInitialIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialIndex + noDataInPage);
  const navigate = useNavigate();

  useEffect(() => {
    let arr = originalData?.slice(initialIndex, lastIndex);
    setPaginateData(arr);
    console.log("infinite");
  }, [currPage, searchData]);
  // pagination end

  // const [goData, setGoData] = useState(currPage)
  console.log("hjgjkh", paginateData, originalData);
  return (
    <div>
      <div className="container mt-4">
        <p className="topActHead">All Activities</p>
        <div className="bannerThingsDiv">
          {/* <BannerThings /> */}
          <section className="Activities mb-4">
            <div className="container-fluid">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start">
                <div className="activitiesText">
                  {searchData?.length} Activities
                </div>
                {/* <div className="d-flex align-items-center">
                                    <div className="sortBy mr-3">Sort By:</div>
                                    <div className="recomText d-flex mr-2 align-items-center">
                                        <li class="nav-item dropdown list-unstyled">
                                            <a
                                                class="nav-link dropdown-toggle"
                                                href="#"
                                                id="navbarDropdownMenuLink"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Recommended
                                            </a>
                                            <div
                                                class="dropdown-menu"
                                                aria-labelledby="navbarDropdownMenuLink"
                                            >
                                                <a class="dropdown-item" href="#">
                                                    Action
                                                </a>
                                                <a class="dropdown-item" href="#">
                                                    Another action
                                                </a>
                                                <a class="dropdown-item" href="#">
                                                    Something else here
                                                </a>
                                            </div>
                                        </li>
                                    </div>
                                </div> */}
              </div>
            </div>
          </section>

          <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              <div className="row">
                <div className="col-12"></div>
              </div>
              <div className="culturalExperiencePart row">
                {/* {tempData?.map((item, idx) => { */}
                {/* {searchData?.All_activity?.map((item, idx) => { */}
                {paginateData?.map((item, idx) => {
                  console.log("gjhgf", item);
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
                            <p className="edinBurgText">
                              '{item.activityTitle}
                            </p>
                            {/* <p className="edinBurgText2">Magical Guided Walking Tour</p> */}
                            <p className="timeTextPart">
                              {item?.tourDuration?.value}{" "}
                              {item?.tourDuration?.unit}
                            </p>
                            <div>
                              {/* <i className="fa-solid fa-star starRatingPart"></i>
                                                            <i className="fa-solid fa-star starRatingPart"></i>
                                                            <i className="fa-solid fa-star starRatingPart"></i>
                                                            <i className="fa-solid fa-star starRatingPart"></i>
                                                            <i className="fa-solid fa-star starRatingPart"></i>
                                                            <span className="reviewText">4.8</span>
                                                            <span className="numberOfReviews">({item.review} review)</span> */}
                              {/* {item?.reviewRating != undefined && (
                                <ReviewRating rating={item?.reviewRating} totalReview={item?.totalReview} />
                              )}

                              {item?.review != undefined && (
                                <ReviewRating
                                  rating={item?.review}
                                  // totalReview={item?.totalReview}
                                />
                              )} */}
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
                              {/* <i class="fa-regular fa-heart"></i> */}
                              <WishListComp
                                item={item}
                                fetchActivity={getSearchData}
                                showEmptyHeart={
                                  item?.wishlistData?.[0]?.folderId
                                }
                                folderId={item?.wishlistData?.[0]?.folderId}
                              />
                            </span>
                          </figure>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {searchData.length === 0 && <div>No Activity Found</div>}
              </div>

              {/* Pagination start*/}
              <div className="paginationDiv mb-3">
                <button
                  className={`pagiBtns ${
                    currPage === 1 ? "" : "pagiActiveBtn"
                  }`}
                  disabled={currPage === 1}
                  onClick={() => {
                    if (currPage > 1) {
                      setInitialIndex(initialIndex - noDataInPage);
                      setLastIndex(lastIndex - noDataInPage);
                      setCurrPage(currPage - 1);
                    }
                  }}
                >
                  <i class="fa-solid fa-chevron-left"></i>
                </button>

                <p className="pageText">
                  Page <span>{currPage}</span> of <span>{totalNoOfPage}</span>
                </p>

                <button
                  className={`pagiBtns ${
                    currPage >= totalNoOfPage ? "" : "pagiActiveBtn"
                  }`}
                  disabled={currPage >= totalNoOfPage}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currPage < totalNoOfPage) {
                      setLastIndex(lastIndex + noDataInPage);
                      setInitialIndex(initialIndex + noDataInPage);
                      setCurrPage(currPage + 1);
                    }
                  }}
                >
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              {/* pagination End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllActivity;
