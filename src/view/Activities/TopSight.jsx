import React from "react";

const TopSight = ({siteDetail}) => {
  return (
    <div>
      <section className="top-sight">
        <div className="container-fluid">
          <h3>
            Top sights near <span> {siteDetail?.siteName}</span>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default TopSight;
