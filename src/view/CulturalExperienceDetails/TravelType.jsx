import moment from "moment";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import girl404 from "../../assets/girl404.gif";

const TravelType = ({ detail, setPage }) => {
  // const [check, setCheck] = useState('');
  // const [checkstars, setCheckstars] = useState('');
  const originalData = detail;
  const [paginateData, setPaginateData] = useState([]);
  const noDataInPage = 3;
  const totalNoOfPage = Math.ceil(
    detail?.latestReviewer?.length / noDataInPage
  );
  const [currPage, setCurrPage] = useState(1);
  const [initialIndex, setInitialIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialIndex + noDataInPage);

  return (
    <>
      <section className="travelTypePart">
        <div className="container-fluid">
          <div className="row"></div>
          {detail?.latestReviewer?.length > 0 &&
            detail?.latestReviewer?.map((item, i) => {
              return (
                <div className="row mt-3" key={i}>
                  <div className="col-12 trvaelTypeHead">
                    <div className="trvaelTypeHeadPart1">
                      <i className="fa-regular fa-user"></i>

                      <span className="travRah">{item?.firstName}</span>
                    </div>
                    <div className="trvaelTypeHeadPart2">
                      <p>{`${moment(item?.createdOn).format(
                        "DD MMMM YYYY"
                      )}`}</p>
                    </div>
                  </div>
                  <div className="col-12 trvaelTypeReview">
                    <div className="travelTextReview">
                      <p className="travelReveiewPara">{item?.review}</p>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Pagination start*/}
          <div className="paginationDiv mb-3">
            <button
              className={`pagiBtns ${currPage === 1 ? "" : "pagiActiveBtn"}`}
              disabled={currPage === 1}
              onClick={() => {
                if (currPage > 1) {
                  setInitialIndex(initialIndex - noDataInPage);
                  setLastIndex(lastIndex - noDataInPage);
                  setCurrPage(currPage - 1);
                  setPage((page) => page - 1);
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
                  setPage((page) => page + 1);
                }
              }}
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          {/* pagination End */}
        </div>
      </section>
    </>
  );
};

export default TravelType;
