import React, { useState } from "react";
import destinations_bg from "../../assets/Images/destinations.png";
import { useGlobalDataCtx } from "../../Context/GlobalDataProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLoader from "../../components/Loaders/MainLoader";
import HomeService from "../../Service/HomeService";

function TopDestinations() {
  const { fetchedTopCountries, fetchedTopCities, fetchedTopActivitySites } =
    useGlobalDataCtx();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleListClick = async (data) => {
   
    // if (!searchName) return toast.error("Please enter data");
    // return
    console.log("dfhhk", data);
    const sendData = {
      id: data?._id,
    };

    setIsLoading(true);
    const res = await HomeService.homePageSearch(sendData);
    console.log("searchRes", res);

    if (res && res?.status) {
      if (res?.data && res?.data?.length !== 0) {
        // setSearchData(res?.data);

        if (data?.name) {
          // setSearchListName(data?.name);
          // setSearchName("");
          navigate(`/search-countries/${data?._id}/${data?.name}`);
        } else if (data?.cityName) {
          // setSearchListName(data?.cityName);
          // setSearchName("");
          navigate(`/search-cities/${data?._id}/${data?.cityName}`);
        } else if (data?.activityTitle) {
          // setSearchListName(data?.activityTitle);
          // setSearchName("");
          navigate(`/activity/${res?.data[0]?._id}/${res?.data[0]?.slug}`);
        } else if (data?.destinationName) {
          console.log("jjk",data);
          // setSearchListName(data?.cityName);
          // setSearchName("");
          navigate(`/search-sites/${data?._id}/${data?.destinationName}`);
        }
      } else {
        toast.error("No data found");
      }
      setIsLoading(false);
    } else {
      toast.error(res.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="tabingSection">
        <ul className="nav nav-tabs mySeenTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#Popular1"
              role="tab"
            >
              Top Countries
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#Popular2"
              role="tab"
            >
              Top Cities
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#Popular3"
              role="tab"
            >
              Top Sites
            </a>
          </li>
        </ul>
        <div className="navAfterDiv" />
        <div className="tabSectionPartParent">
          <div
            className="tabSectionPart"
            style={{ backgroundImage: `url('${destinations_bg}')` }}
          >
            <div className="tabBackClr">
              <div className="tab-content tabBackClrContent">
                <div className="tab-pane active" id="Popular1" role="tabpanel">
                  <div
                    className="tabUnorderList"
                    style={{
                      display: "flex",
                      color: "white",
                      flexWrap: "wrap",
                      gap: "20px",
                      justifyContent: "center",
                      alignItem: "center",
                      fontSize: "18px",
                      padding: "5px",
                    }}
                  >
                    {fetchedTopCountries?.map((item, i) => {
                      return (
                        <p
                          key={i}
                          style={{ cursor: "pointer" }}
                          className="topCatText"
                          onClick={() => handleListClick(item)}
                        >
                          {item?.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="tab-pane" id="Popular2" role="tabpanel">
                  <div
                    className="tabUnorderList"
                    style={{
                      display: "flex",
                      color: "white",
                      flexWrap: "wrap",
                      gap: "20px",
                      justifyContent: "center",
                      alignItem: "center",
                      fontSize: "18px",
                      padding: "5px",
                    }}
                  >
                    {fetchedTopCities.map((item, i) => {
                      return (
                        <p
                          key={i}
                          style={{ cursor: "pointer" }}
                          className="topCatText"
                          onClick={() => handleListClick(item)}
                        >
                          {item?.cityName}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="tab-pane" id="Popular3" role="tabpanel">
                  <div
                    className="tabUnorderList"
                    style={{
                      display: "flex",
                      color: "white",
                      flexWrap: "wrap",
                      gap: "20px",
                      justifyContent: "center",
                      alignItem: "center",
                      fontSize: "18px",
                      padding: "5px",
                    }}
                  >
                    {fetchedTopActivitySites?.map((item, i) => {
                      console.log("itree", item);
                      return (
                        <p
                          style={{ cursor: "pointer" }}
                          key={i}
                          className="topCatText"
                          onClick={() => handleListClick(item)}
                        >
                          {item?.destinationName}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TopDestinations;
