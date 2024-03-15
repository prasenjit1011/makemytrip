import React, { useEffect, useState } from "react";
import "./Activity.css";
import mPageLogo from "../../assets/Images/mPageLogo.jpg";
import { Link, useParams } from "react-router-dom";
import testPic from "../../assets/Images/About_card1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HttpClient from "../../utils/HttpClient";
import ActivityService from "../../Service/ActivityService";

function ActivityProvider() {
  const { id } = useParams();
  const [Activitydetails, setActivityDetails] = useState({});
  useEffect(() => {
    getactivityProvider();
  }, []);

  const getactivityProvider = () => {
    ActivityService.marchantdata(id)

      .then((res) => {
        if (res && res?.status) {
          console.log("Activiyrdata", res);
          setActivityDetails(res.data[0]);
        }
      })
      .catch((err) => {});
  };
  return (
    <section className="activityProviderSec">
      <div className="custContain">
        <div className="actProDiv">
          <figure className="actProLogoFig">
            <img src={Activitydetails?.image} alt="..." />
          </figure>
          <div>
            <p className="actProHead">{Activitydetails?.companyName}</p>
            <div className="actProStarTextDiv">
              {/* <div className="actProStarDiv">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div> */}
              {/* <p className="actProStarPara">275 reviews</p> */}
            </div>
            {/* <p className="actProLongPara">{Activitydetails?.designation}</p> */}
            <p className="actProLongPara">
              This activity provider is a trader on the Things To Do marketplace
            </p>
          </div>
        </div>
        <div className="allActBroPageDivs">
          <p className="allActBroSubHeads">Legal notice</p>
          <div className="legNoteDivs">
            <span className="legNoteSpans">Legal company name</span>
            <span className="legNoteSpans">
              {Activitydetails?.legalCompanyName}
            </span>
          </div>
          <div className="legNoteDivs">
            <span className="legNoteSpans">Registered address</span>
            <span className="legNoteSpans">
              {Activitydetails?.companyStreetAddress},
              {Activitydetails?.compCity},{Activitydetails?.postalCode},
            </span>
          </div>
          <div className="legNoteDivs">
            <span className="legNoteSpans">Managing director(s)</span>
            <span className="legNoteSpans">
              {Activitydetails?.directorName}
            </span>
          </div>
        </div>
        <div className="allActBroPageDivs">
          <p className="allActBroSubHeads">Contact details</p>
          <div>
            <div>
              <Link to="/" className="actBroConLinks">
                {Activitydetails?.email}
              </Link>{" "}
              <span className="actBroConLinkSpan">or</span>{" "}
              <Link to="/" className="actBroConLinks">
                {Activitydetails?.mobile}
              </Link>
            </div>
            <p className="actBroConText">
              Things To Do answers all contacts on behalf of the activity
              provider
            </p>
          </div>
        </div>
        <div className="allActBroPageDivs">
          <p className="allActBroSubHeads">About the activity provider</p>
          <p className="actBroAbtPara">{Activitydetails?.description}</p>
          <div className="campTroDiv">
            <p className="campTroHead">Social Links:</p>
            <Link
              to={Activitydetails?.socialLink}
              target="_blank"
              className="campTroLink"
            >
              {Activitydetails?.socialLink}
            </Link>
          </div>
          {/* <div className="campTroDiv">
            <p className="campTroHead">
              Camp Troll AS offers tours and activities in these cities:
            </p>
            <Link to="/" className="campTroLink">
              Svensby,
            </Link>
            <Link to="/" className="campTroLink ml-2">
              Tromsø
            </Link>
          </div> */}
        </div>
        {/* <div className="allActBroPageDivs">
          <p className="allActBroSubHeads">
            Things to do organized by Camp Troll AS
          </p>
          <div className="orgCampDiv">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop="true"
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                400: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              className="myActBroSwiper"
            >
              <SwiperSlide>
                <div className="ratingInsidePartAnchor">
                  <div className="ratingInsidePart">
                    <Link
                      style={{ textDecoration: "none" }}
                      className="ratingTextPart"
                      to={`/`}
                    >
                      <p className="edinBurgText">
                        From London: Oxford And Cotswolds Villages Day Trip
                      </p>
                      <p className="timeTextPart">1 days</p>

                      <div>
                        <i data-star={5} className="reviewCardStar"></i>
                        <span className="reviewText ml-1">0</span>
                        <span className="numberOfReviews">(0 Reviews)</span>
                      </div>
                      <p className="fromDollarPart">From £ 33 per person</p>
                    </Link>
                    <figure className="ratingImgPart ratingImgPartActBro">
                      <Link to={`/`}>
                        <img src={testPic} alt="activity-img-not-found" />
                      </Link>
                      <i
                        className="fa-regular fa-heart"
                        style={{ cursor: "pointer", color: "#f95d12" }}
                      />
                    </figure>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default ActivityProvider;
