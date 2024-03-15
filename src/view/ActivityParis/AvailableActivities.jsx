import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import img1 from "../../assets/Images/activities/img1.png";
import img2 from "../../assets/Images/activities/img2.png";
import img3 from "../../assets/Images/activities/img3.png";
import img4 from "../../assets/Images/activities/img4.png";
import img5 from "../../assets/Images/activities/img5.png";
import img6 from "../../assets/Images/activities/img6.png";
import img7 from "../../assets/Images/activities/img7.png";
import img8 from "../../assets/Images/activities/img8.png";

const AvailableActivities = ({ activites, itemsPerPage }) => {
  const items = [
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
    {
      id: 5,
      image: img5,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 6,
      image: img6,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 7,
      image: img7,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 8,
      image: img8,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 9,
      image: img5,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 10,
      image: img3,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 11,
      image: img1,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 12,
      image: img7,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 13,
      image: img4,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 14,
      image: img6,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 15,
      image: img3,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
    {
      id: 16,
      image: img8,
      title: "Guided Tour",
      desc: "Paris: Eiffel Tower Summit or Second Floor Access",
      price: "₹ 3,538 ",
    },
  ];

  function Items({ currentItems }) {
    return (
      <>
        <section className="tour-list">
          <div className="container-fluid">
            <div className="list1 text-center">
              <h4 className="headingTop">All Activities</h4>

              <div className="row">
                {currentItems?.length > 0 ?
                  currentItems.map((items) => (
                    <div
                      className="col-xl-3 col-lg-3 col-md-6 col-12"
                      key={items._id}
                    >
                      <div className="guide">
                        <img src={items.image[0]} alt="" className="img-fluid" />
                        <div className="pic-text">
                          <p className="rate">{items.activityTitle}</p>
                          {/* <h5 className="view">{items.description}</h5> */}
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
                              From {items.activityActualPrice} <span> per person</span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : "No Activity Found"
                }
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={activites} />
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel= <FiChevronRight size={30} />
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel= <FiChevronLeft size={30}/>
        renderOnZeroPageCount={null}
        className="paginateStyle my-5"
      /> */}
    </>
  );
};

export default AvailableActivities;
