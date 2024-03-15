import React from "react";
import { useState, useEffect } from "react";

import paris from "../../assets/Images/paris.png";
import newYork from "../../assets/Images/newYork.png";
import usa1 from "../../assets/Images/usa1.png";
import usa2 from "../../assets/Images/usa2.png";
import italy from "../../assets/Images/italy.png";
import albarello from "../../assets/Images/albarello.png";
import uk from "../../assets/Images/uk.png";
import uae from "../../assets/Images/uae.png";
import { Link } from "react-router-dom";
import ActivityService from "../../Service/ActivityService";
import { useHome } from "../../Context/HomeContext";

const AweInspiring = ({ data }) => {
  const type = new URLSearchParams(window.location.search).get("currentTab");
  const { setCurrentTabId, currentTabId, section, bannerData } = useHome();
  const [cities, setcities] = useState([]);
  const [citisTitle, setCityTitle] = useState("");
  const fetchcities = () => {
    ActivityService.getTypeAgainstCities(currentTabId)
      .then((res) => {
        console.log("fucking home page city", res.data?.cities);
        if (res.status) {
          setcities(res.data?.cities);
          setCityTitle(res.data?.title);
        }
        console.log("cities ======>", res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchcities();
  }, [currentTabId]);

  return (
    <div>
      <section className="aweInspiringPart">
        <div className="custContain">
          <div className="row">
            <div className="col">
              <p className="aweHeadingPart">{citisTitle}</p>
              <p className="topDestiNation">TOP DESTINATIONS</p>
            </div>
          </div>
          <div className="row aweImgPart">
            {cities?.map((item, idx) => {
              return (
                <div
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-7 marginBottomClass"
                  key={idx}
                >
                  {/* <Link to={`/city/${type}/${item._id}`}> */}
                  <Link to={`/city/${item._id}`}>
                    <figure>
                      <img src={item?.cityData?.picture} alt="" />
                      <div className="aweInnerImgTextParentPart">
                        <p className="aweInnerImgTextPart">
                          {item.cityData?.cityName}
                        </p>
                      </div>
                    </figure>
                  </Link>
                </div>
              );
            })}
            {/* <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={newYork} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">NEW YORK CITY</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={usa1} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">USA</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={usa2} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">USA</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={italy} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">ITALY</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={albarello} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">ALBARELLO</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={uk} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">UK</p>
                  </div>
                </figure>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-3 marginBottomClass">
              <a href="#">
                <figure>
                  <img src={uae} alt="" />
                  <div className="aweInnerImgTextParentPart">
                    <p className="aweInnerImgTextPart">UAE</p>
                  </div>
                </figure>
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AweInspiring;
