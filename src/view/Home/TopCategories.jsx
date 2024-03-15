import React, { Fragment, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useGlobalDataCtx } from "../../Context/GlobalDataProvider";
import { useNavigate } from "react-router-dom";
import HomeService from "../../Service/HomeService";
import toast from "react-hot-toast";
import MainLoader from "../../components/Loaders/MainLoader";
// import countrylogo from "../../assets/Images/australia.png";

const TopCategories = () => {
  const [view, setView] = useState(0);
  const { fetchedTopCountries, fetchedTopCities, fetchedTopActivitySites } =
    useGlobalDataCtx();
  // console.log("fetchedTopActivitySites", fetchedTopActivitySites);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setActive(1);
  };

  const handleListClick = async (data) => {
    console.log("hjysrius", data);
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

      <section className="aweAfterPart">
        <div className="custContain">
          <div className="aweAfterPartRow">
            <Tabs>
              <TabList className="d-flex flex-row justify-content-around list-unstyled">
                <div className="aweAfterPartHeading">
                  <Tab>
                    <div className="aweAfterPartHeadingBtn">
                      <p
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          handleClick();
                          setView(0);
                        }}
                        className={`topTabPart topTabPart1 ${
                          active == 1 ? "topTabPartActive" : ""
                        } `}
                      >
                        {/* Top attractions worldwide */}
                        Top Countries
                      </p>
                    </div>
                  </Tab>
                  <Tab>
                    <div className="aweAfterPartHeadingBtn">
                      <p
                        onClick={() => {
                          setActive(2);
                          setView(1);
                        }}
                        className={`topTabPart topTabPart1 ${
                          active === 2 ? "topTabPartActive" : ""
                        }`}
                      >
                        {/* Top destinations */}
                        Top Cities
                      </p>
                    </div>
                  </Tab>
                  <Tab>
                    <div className="aweAfterPartHeadingBtn">
                      <p
                        onClick={() => {
                          setActive(3);
                          setView(2);
                        }}
                        className={`topTabPart topTabPart1 ${
                          active === 3 ? "topTabPartActive" : ""
                        }`}
                      >
                        {/* Top countries to visit */}
                        Top Sites
                      </p>
                    </div>
                  </Tab>
                </div>
              </TabList>
              <div className="aweAfterPartUlGrandParent">
                {view === 0 && (
                  <TabPanel>
                    <div className="aweAfterPartUlParent aweAfterPartUlParentOne">
                      <div>
                        <ul
                          className="row row-cols-xl-5 row-cols-lg-4 row-cols-sm-3 row-cols-2"
                          style={{ paddingBottom: "30px" }}
                        >
                          {fetchedTopCountries?.map((item, i) => {
                            return (
                              <li key={i}>
                                <p
                                  className="niagaraPart topCatText"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleListClick(item)}
                                >
                                  {item?.name}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </TabPanel>
                )}
                {view === 1 && (
                  // <TabPanel>
                  <div className="aweAfterPartUlParent aweAfterPartUlParentOne">
                    <div>
                      <ul
                        className="row row-cols-xl-5 row-cols-lg-4 row-cols-sm-3 row-cols-2"
                        style={{ paddingBottom: "30px" }}
                      >
                        {fetchedTopCities.map((item, i) => {
                          return (
                            <li
                              key={i}
                              style={{ cursor: "pointer" }}
                              className="topCatText"
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                handleListClick(item);
                              }}
                            >
                              <p className="niagaraPart">{item?.cityName}</p>
                              <p className="eightTwoTours">
                                {item?.tourAndActivity} tours & activities
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  // </TabPanel>
                )}
                {view === 2 && (
                  // <TabPanel>
                  <div className="aweAfterPartUlParent aweAfterPartUlParentOne">
                    <div>
                      <ul
                        className="row row-cols-xl-5 row-cols-lg-4 row-cols-sm-3 row-cols-2"
                        style={{ paddingBottom: "30px" }}
                      >
                        {fetchedTopActivitySites?.map((item, i) => {
                          return (
                            <li
                              key={i}
                              style={{ cursor: "pointer" }}
                              className="topCatText"
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                handleListClick(item);
                              }}
                            >
                              <p className="niagaraPart">
                                {item?.destinationName}
                              </p>
                              <p className="eightTwoTours">
                                {item?.tourAndActivity} tours & activities
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  // </TabPanel>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    </>
    //
  );
};

export default TopCategories;
