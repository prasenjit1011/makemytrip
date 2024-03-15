import { useEffect, useState } from "react";
import mainbody_bg from "../../assets/Images/sitemapBanner.png";
import {
  getCitiesAgainstCountry,
  getSitemap,
} from "../../API_HELPERS/apiHelpers";
import MainLoader from "../../components/Loaders/MainLoader";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countryName, setcountryName] = useState("");

  const fetchSiteMap = async () => {
    setIsLoading(true);
    try {
      const res = await getSitemap();
      console.log("SITEMAP", res);
      if (res && res?.status) {
        setData(res?.data);
        console.log("FETCHED SITEMAPS", res?.data);
      } else {
        console.log("ERROR FETCHING SITEMAPS", res);
      }
    } catch (error) {
      console.log("ERROR FETCHING SITEMAPS", error);
    }
    setIsLoading(false);
  };

  const fetchCities = async (id) => {
    setIsLoading(true);
    try {
      const res = await getCitiesAgainstCountry(id);
      console.log("FETCHED CITIES", res);
      if (res && res?.status) {
        setcountryName(res?.countryname);
        setCities(res?.data);
        console.log("FETCHED CITIES", res?.data);
      } else {
        console.log("ERROR FETCHING CITIES", res);
      }
    } catch (error) {
      console.log("ERROR FETCHING CITIES", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchSiteMap();
  }, []);

  let CountynamefromLoop = "";

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section
        className="banerInformSection"
        style={{ backgroundImage: `url('${mainbody_bg}')` }}
      >
        <div className="banerInformDiv">
          <p className="sitemapPara">
            Sitema<span>p</span>
          </p>
        </div>
      </section>
      <section className="allToursSection">
        <h1 className="allToursPara">
          All Tours &amp; Activities by Destination
        </h1>
        <div className="container">
          <div className="row allTourRow">
            {
              /* <div className="col-4 checkColLeft"> */
              //
            }
            {!showCities &&
              data
                ?.sort((a, b) => a._id.localeCompare(b._id))
                ?.map((item, i) => {
                  console.log("jhjkh", item);
                  return (
                    <div className="col-4 checkColLeft" key={i}>
                      <div className="souhDiv">
                        <h5 className="souHead">{item?._id}</h5>
                        <ul className="souhUl">
                          {item?.continent?.map((country) => {
                            return (
                              <li
                                className="souhLi"
                                style={{ cursor: "pointer", color: "#f95d12" }}
                                onClick={() => {
                                  console.log("country", country);
                                  fetchCities(country?.countryId);
                                  setShowCities(true);
                                }}
                              >
                                {country?.countryName}
                              </li>
                            );
                          })}

                          {/* <li className="souhLi">Bolivia</li>
                      <li className="souhLi">Bolivia</li>
                      <li className="souhLi">Peru</li>
                      <li className="souhLi">Venezuela</li>
                      <li className="souhLi">Colombia</li> */}
                        </ul>
                      </div>
                    </div>
                  );
                })}

            {showCities && (
              <>
                <button
                  type="button"
                  className="btnbck"
                  style={{ fontWeight: "700" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCities(false);
                  }}
                >
                  Go Back &nbsp;
                  <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                </button>
                <div className="col-4 checkColLeft">
                  <div className="souhDiv">
                    <h5 className="souHead">{countryName}</h5>
                    {cities?.map((item, i) => {
                      console.log("jkjsd", item);
                      return (
                        <ul className="souhUl">
                          <li
                            className="souhLi"
                            style={{ cursor: "pointer", color: "#f95d12" }}
                            onClick={() => navigate(`/city/${item?._id}`)}
                          >
                            {item?.cityName}
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {/* </div> */}
            {/* <div className="col-4 checkCol">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
            <div className="col-4 checkColRight">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div> */}
          </div>
          {/* <div className="row allTourRow">
            <div className="col-4 checkColLeft">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
            <div className="col-4 checkCol">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
            <div className="col-4 checkColRight">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row allTourRow">
            <div className="col-4 checkColLeft">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
            <div className="col-4 checkCol">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
            <div className="col-4 checkColRight">
              <div className="souhDiv">
                <h5 className="souHead">South America</h5>
                <ul className="souhUl">
                  <li className="souhLi">Argentina</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Bolivia</li>
                  <li className="souhLi">Peru</li>
                  <li className="souhLi">Venezuela</li>
                  <li className="souhLi">Colombia</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Index;
