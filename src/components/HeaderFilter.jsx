import React, { useEffect, useState } from "react";

import guideTour1 from "../assets/Images/guideTour1.png";
import { Link, useParams } from "react-router-dom";
import HomeService from "../Service/HomeService";
import { useLoaderData } from "react-router-dom";
import { useHome } from "../Context/HomeContext";
import { useLocation } from "react-router-dom";
import loadingBanner from "../assets/loadingBanner.jpg";
import { toast } from "react-hot-toast";
import { useGlobalDataCtx } from "../Context/GlobalDataProvider";
import { useNavigate } from "react-router-dom";
import emptyLocation from "../assets/Images/emptyLocation.png";
import MainLoader from "./Loaders/MainLoader";

const HeaderFilter = () => {
  const navigate = useNavigate();
  const { setSearchData, setSearchListName, folders } = useGlobalDataCtx();

  const [searchName, setSearchName] = useState("");
  const [searchListData, setSearchListData] = useState([]);
  const [searchListLoad, setSearchListLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stickyFix, setStickyFix] = useState(false);
  const [formSticky, setFormSticky] = useState(false);
  // const param = useParams();
  const location = useLocation();
  const {
    activityType,
    bannerData,
    fetchBanner,
    setCurrentTabId,
    currentTabId,
    // isLoading,
  } = useHome();

  const [tab, setTab] = useState(
    new URLSearchParams(window.location.search).get("currentTab")
  );

  console.log("TAB", tab);

  const SelectTabHandle = (id) => {
    let url = new URL(window.location.href);
    url.searchParams.set("currentTab", id);
    window.history.replaceState({}, "", url.href);
    console.log("URL", url.searchParams.get("currentTab"));
    setCurrentTabId(id);
    fetchBanner(id);
  };

  const handleChangeSearch = async (e) => {
    e.stopPropagation();
    setSearchName(e.target.value);
    const sendData = {
      searchname: e.target.value,
    };

    setSearchListLoad(true);
    const res = await HomeService.searchList(sendData);
    console.log("resSearchList", res);
    if (res && res?.status) {
      setSearchListData(res?.data);
      setSearchListLoad(false);
    } else {
      setSearchListLoad(false);
    }
  };

  const handleListClick = async (data) => {
    // alert("k");
    console.log("hdvl", data);
    if (!searchName)
      return toast.error("Please enter the keyword to be searched");
    // return
    //"64ec785aa4155c7498522768"
    let sendData = {};
    if (data?.activitySiteId) {
      sendData = {
        id: data?.activitySiteId,
      };
    } else {
      sendData = {
        id: data?._id,
      };
    }

    setIsLoading(true);
    const res = await HomeService.homePageSearch(sendData);
    console.log("searchRes", res);

    if (res && res?.status) {
      if (res?.data && res?.data?.length !== 0) {
        setSearchData(res?.data);

        if (data?.name) {
          // setSearchListName(data?.name);
          // alert("name");
          setSearchName("");
          navigate(`/search-countries/${data?._id}/${data?.name}`);
        } else if (data?.cityName) {
          // alert("cityName");
          setSearchListName(data?.cityName);
          setSearchName("");
          //  navigate(`/city/${data?._id}`);
          navigate(`/search-cities/${data?._id}/${data?.cityName}`);
        } else if (data?.activityTitle) {
          // alert("activityTitle");
          setSearchListName(data?.activityTitle);
          setSearchName("");
          navigate(`/activity/${res?.data[0]?._id}/${res?.data[0]?.slug}`);
        } else if (data?.siteName) {
          // alert("siteName", data?.siteName);
          // console.log("rrrr", res, data, data?.siteName);
          // setSearchListName(data?.cityName);
          setSearchName("");
          navigate(`/search-sites/${data?._id}/${data?.siteName}`);
        }
      } else {
        toast.error("Search Results Not Found ");
      }
      setIsLoading(false);
    } else {
      toast.error(res.message || "Something went wrong!");
      setIsLoading(false);
    }
  };

  function setFixed() {
    if (window.scrollY > 400) {
      setStickyFix(true);
    } else {
      setStickyFix(false);
    }
  }

  function setFormFixed() {
    if (window.scrollY > 180) {
      setFormSticky(true);
    } else {
      setFormSticky(false);
    }
  }

  // console.log(window.location.hash);
  // console.log("Location", location);
  window.addEventListener("scroll", setFixed);
  window.addEventListener("scroll", setFormFixed);

  // const searchOutsideClickHandler = e => {
  //   // console.log('LISTENING');
  //   const searchParent = document.querySelector('#searchParent');
  //   if (!searchParent.contains(e.target)) {
  //     setSearchName('');
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', searchOutsideClickHandler);
  //   return () => document.removeEventListener('mousedown', searchOutsideClickHandler);
  // });

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <div>
        <section className="bannerPart">
          <div className="container-fluid">
            <div
              className="row imgBanPart"
              style={{ zIndex: "2" }}
              onClick={() => setSearchName("")}
            >
              {/* search */}

              <from
                className={
                  formSticky ? "bannerSearchForm fixed" : "bannerSearchForm"
                }
                id="searchParent"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="bannerSearchFormInnerDiv">
                  <i class="fa-solid fa-magnifying-glass bannerSearchIcon"></i>
                  <input
                    placeholder="Where are you going?"
                    className="bannerInput"
                    value={searchName}
                    onChange={(e) => handleChangeSearch(e)}
                  />

                  {searchName && (
                    <>
                      <div
                        className="bannerLoadDiv"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ul className="bannerLoadUl">
                          {searchListLoad ? (
                            <div>Loading...</div>
                          ) : (
                            searchListData?.map((item, i) => {
                              return (
                                <li
                                  key={i}
                                  onClick={() => handleListClick(item)}
                                  className="bannerLoadLi"
                                >
                                  <figure className="banSearchDivFig">
                                    <img
                                      src={
                                        item?.picture ||
                                        item?.image ||
                                        item?.images ||
                                        emptyLocation
                                      }
                                      alt="..."
                                    />
                                  </figure>
                                  {item?.name && (
                                    <span className="bannerSearLoadSpan">
                                      {item?.name}
                                    </span>
                                  )}
                                  {item?.cityName && (
                                    <span className="bannerSearLoadSpan">
                                      {item?.cityName}, {item?.countryname}
                                    </span>
                                  )}
                                  {item?.activityTitle && (
                                    <span className="bannerSearLoadSpan">
                                      {item?.activityTitle}
                                    </span>
                                  )}
                                  {item?.siteName && (
                                    <span className="bannerSearLoadSpan">
                                      {item?.siteName}, {item?.cityname}
                                    </span>
                                  )}
                                </li>
                              );
                            })
                          )}

                          {!searchListLoad && searchListData?.length === 0 && (
                            <div>No Data Found...</div>
                          )}
                        </ul>
                      </div>
                    </>
                  )}

                  <button
                    className="bannerSearchBtn"
                    onClick={() => {
                      handleListClick(searchListData[0]);
                    }}
                  >
                    Search
                  </button>
                </div>
              </from>
              <figure>
                {!isLoading ? (
                  <img
                    // src={bannerData?.bannerImg}
                    src={bannerData?.bannerImg}
                    alt="banner"
                    className="img-fluid bannerImgPart fade-in"
                  />
                ) : (
                  <img
                    src={loadingBanner}
                    alt="banner"
                    className="img-fluid bannerImgPart"
                  />
                )}
              </figure>
            </div>
            <div className="row banTextPart" style={{ zIndex: "-1" }}>
              <div className="col-12 banTextSubPart">
                <p className="discoverHeading">
                  {bannerData?.bannerTitle}
                  {/* DISCOVE<span className="noLetterSpace">R</span> */ }
                </p>
              </div>
              <div className="col-12 banTextSubPart">
                <p className="turningPart">{bannerData?.bannerDesc}</p>
                <Link
                  className="lernPart"
                  to={`/activity/${bannerData?.activityId}/${bannerData?.slug}`}
                >
                  Learn More{" "}
                  <span>
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="row tabingBtnPart">
            <div
              className={
                stickyFix ? "tabingBtnPartCol fixed" : "tabingBtnPartCol"
              }
            >
              <ul className="nav nav-tabs tabingBtnPartTabs" role="tablist">
                {activityType.map((item) => {
                  return (
                    <li
                      className="nav-item navItemPart navItemPartOne"
                      key={item._id}
                      style={{ cursor: "pointer", flex: 1 }}
                    >
                      <a
                        className={`nav-link ${
                          tab == item._id ? "active" : ""
                        } navLinksPart`}
                        data-toggle="tab"
                        role="tab"
                        onClick={() => SelectTabHandle(item._id)}
                      >
                        <div className="navTabIconParent">
                          {/* <i className="fa-solid fa-gopuram"></i> */}

                          <img
                            src={item.logo}
                            className="img-fluid"
                            alt="icon"
                          />

                          {/* <ReactSVG src={item.logo} /> */}
                        </div>

                        <p className="navPartAfterText">{item.name}</p>
                      </a>
                    </li>
                  );
                })}
                {/* <li className="nav-item navItemPart navItemPartTwo">
                    <a
                      className="nav-link navLinksPart"
                      data-toggle="tab"
                      href="#tabs-3"
                      role="tab"
                    >
                      <div className="navTabIconParent">
                        <i className="fa-solid fa-utensils"></i>
                      </div>
                      <p className="navPartAfterText">Food</p>
                    </a>
                  </li>
                  <li className="nav-item navItemPart navItemPartThree">
                    <a
                      className="nav-link navLinksPart"
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                    >
                      <div className="navTabIconParent">
                        <i className="fa-brands fa-pagelines"></i>
                      </div>
                      <p className="navPartAfterText">Nature</p>
                    </a>
                  </li>
                  <li className="nav-item navItemPart navItemPartFour">
                    <a
                      className="nav-link navLinksPart"
                      data-toggle="tab"
                      href="#tabs-4"
                      role="tab"
                    >
                      <div className="navTabIconParent">
                        <i className="fa-solid fa-mountain"></i>
                      </div>
                      <p className="navPartAfterText">Adventure</p>
                    </a>
                  </li> */}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeaderFilter;
