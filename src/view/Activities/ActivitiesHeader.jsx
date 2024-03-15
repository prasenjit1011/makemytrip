import React, { useState } from "react";

import arrow1 from "../../assets/Images/activities/arrow1.png";
import arrow from "../../assets/Images/activities/arrow.png";

import { AiOutlineCalendar } from "react-icons/ai";
import SearchBox from "./SearchBox";

const ActivitiesHeader = ({ siteDetail }) => {
  return (
    <>
      <section
        className="things-to-do"
        style={{ backgroundImage: `url(${siteDetail?.image})` }}
      >
        <div className="thingSiteInnerBanner">
          <div className="container-fluid ">
            {/* <SearchBox /> */}

            <h1>{siteDetail?.siteName}</h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default ActivitiesHeader;
