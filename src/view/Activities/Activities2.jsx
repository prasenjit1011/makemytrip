import React from "react";
import { Link } from "react-router-dom";

// import image1 from "../../assets/Images/activities/1st.png";
// import image2 from "../../assets/Images/activities/2nd.png";
// import image3 from "../../assets/Images/activities/3rd.png";
// import image4 from "../../assets/Images/activities/4th.png";
// import image5 from "../../assets/Images/activities/5th.png";
// import image6 from "../../assets/Images/activities/6th.png";
//  const recomTours = [
//    {
//      id: 1,
//      image: image1,
//      head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
//      desc: 'Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different',
//    },
//    {
//      id: 2,
//      image: image2,
//      head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
//      desc: 'Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different',
//    },
//    {
//      id: 3,
//      image: image3,
//      head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
//      desc: 'Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different',
//    },
//    {
//      id: 4,
//      image: image4,
//      head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
//      desc: 'Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different',
//    },
//    {
//      id: 5,
//      image: image5,
//      head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
//      desc: 'Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different',
//    },
//    {
//      id: 6,
//      image: image6,
//      head: '1. Drinking "The New Paris" Walking Tour with Lindsey Tramuta',
//      desc: 'Join Paris-based journalist Lindsey Tramuta on a guided walk through the neighborhoods of East Paris. Through tastings at three different',
//    },
//  ];
const Activities2 = ({ cityActivities, headLine1, headLine2, headLine3 }) => {
  return (
    <div>
      <section className="activities">
        <div className="container-fluid">
          <h1>
            {headLine1} <span>{headLine2} </span>
            {headLine3} <br />
          </h1>
          <div className="paris-tour text-center">
            <div className="row m-0">
              {cityActivities.map((item, i) => {
                return (
                  <div className="col-lg-6 col-md-6 col-sm-12" key={i}>
                    <div className="row activitieswrapbox">
                      <div className="col-lg-5 col-md-5 col-sm-5 p-0">
                        <div className="activitiesimg">
                          <img
                            src={item?.image?.[0]}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>

                      <div className="col-lg-7 col-md-7 col-sm-7 p-0">
                        <div className="content_">
                          <div className="paris">
                            <h4>{item?.activityTitle}</h4>
                            <p>{item?.description}</p>
                          </div>
                          <div className="read">
                            <Link to={`/activity/${item?._id}/${item?.slug}`}>
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities2;
