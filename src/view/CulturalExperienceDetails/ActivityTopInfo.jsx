import React from "react";
import { Link ,useParams} from "react-router-dom";

const ActivityTopInfo = ({ detail, ratingsComp }) => {
  //  console.log('defftail ============', detail); 

   const params = useParams(); 
  return (
    <div>
      <section className="fromParisSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col formParisColHeadingPart">
              <p className="parisHead1">{detail?.activityTitle}</p>
              {/* <p className="parisHead2"></p> */}
              {/* <p className="smallFPart">
                {detail?.countryName} &gt; Things to dooo in {detail?.cityName}{" "}
                &gt;
                {detail?.activitySiteName}
              </p>  */}
                 <Link  to={`/search-countries/${detail?.countryId}/${detail?.countryName}`} > {detail?.countryName} &gt;</Link>
                <Link  >  
                Things to dooo in {detail?.cityName}{" "}
                 </Link> 
                &gt; 
                <Link to={`/search-countries/${params.id}/${detail?.countryName}`}>  {detail?.activitySiteName}</Link>

              <p className="dayTripHead">{detail?.catDetails?.categoryName} </p> 
              <p className="enjoyConvey1">{detail?.description}</p>
              <p className="enjoyConvey2">
                {/* Take a guided tour of the exquisite rooms and galleries */}
              </p>
              <p className="activityHeadPart" >
                Activity provider: 
                <Link
                style={{paddingLeft:"20px"}}
                  to={"/activityProvider/" + detail?.marchandID}
                  className="activityHeadPartAn"
                >
                  {detail?.marchandCompanyName}
                </Link>
              </p>
              <div className="ratingParentPart">
                {/* <div className="starParent">{ratingsComp}</div> */}
                <div className="starParent">
                  <i
                    data-star={detail?.avgRating?.toFixed(1)}
                    style={{ fontSize: "35px" }}
                  ></i>
                </div>

                <p className="custReview">
                  {+detail?.avgRating?.toFixed(1) || 0}
                  <span className="custReviewSpan">/5</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivityTopInfo;
