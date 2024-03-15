import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Activity from "../Home/Activity";
import BannerThings from "../Activities/BannerThings";
import Travel from "../Activities/Travel";
import RecommendedActivities from "./RecommendedActivities";
import TopSearchedAttractions from "./TopSearchedAttractions";
import ThingstodoNewDelhi from "./ThingstodoNewDelhi";
import CitiesIndia from "./CitiesIndia";
import PeoplesayingParis from "../ActivityParis/PeoplesayingParis";
import Peoplesayingsearchpageparis from "./Peoplesayingsearchpageparis";
import "../SearchPage/Search.css";
import bookingPicOne from "../../../src/assets/Images/bookingPicOne.png";
import searchImg from "../../assets/Images/searchImg.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import DiscoverModal from "../../components/Modal/DiscoverModal";
import SearchBox from "../Activities/SearchBox";
import { useHome } from "../../Context/HomeContext";
import { useGlobalDataCtx } from "../../Context/GlobalDataProvider";
import TopActivies from "./TopActivies";
import HomeService from "../../Service/HomeService";
import MainLoader from "../../components/Loaders/MainLoader";
import TopSites from "./TopSites";
import AllActivity from "./AllActivity";
import Questions from "./Questions";
import PopularGuide from "./PopularGuide";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/AuthContextProvider";
import emptyLocation from "../../assets/Images/emptyLocation.png";
import ActivityService from "../../Service/ActivityService";
import moment from "moment";

import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the default theme

const Search = ({ activities = [] }) => {
  const { setSearchData, setSearchListName, folders } = useGlobalDataCtx();
  const [startDate, setStartDate] = useState(new Date());
  const [openDateCalander, setOpenDateCalander] = useState(false);

  const params = useParams();
  const { loginStatus } = useAuth();
  const navigate = useNavigate();

  const [modalA, setModalA] = useState(false);
  const handleClick = () => {
    setModalA(!modalA);
  };

  const [value, onChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchResData] = useState({});
  const [allActivityData, setAllActivitydata] = useState([]);

  const [searchListData, setSearchListData] = useState([]);
  const [searchListLoad, setSearchListLoad] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchNameDefault, setSearchNameDefault] = useState("");

  // range calander
  const initDateRange = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ];
  const [dateRange, setDateRange] = useState(initDateRange);

  console.log("searchNameDefault", searchName);

  // search start
  const handleChangeSearch = async (e) => {
    setSearchNameDefault("");
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

  const handleSearchDefaultClick = async () => {
    setSearchName(searchNameDefault);
    const sendData = {
      searchname: searchNameDefault,
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
    if (!searchName) return toast.error("Please enter data");
    // return

    const sendData = {
      id: data?._id,
    };

    setIsLoading(true);
    const res = await HomeService.homePageSearch(sendData);
    console.log("searchRes", res);

    if (res && res?.status) {
      if (res?.data && res?.data?.length !== 0) {
        setSearchData(res?.data);

        if (data?.name) {
          // setSearchListName(data?.name);
          setSearchName("");
          navigate(`/search-countries/${data?._id}/${data?.name}`);
        } else if (data?.cityName) {
          setSearchListName(data?.cityName);
          setSearchName("");
          // navigate(`/city/${data?._id}`);
          navigate(`/search-cities/${data?._id}/${data?.cityName}`);
        } else if (data?.activityTitle) {
          setSearchListName(data?.activityTitle);
          setSearchName("");
          navigate(`/activity/${res?.data[0]?._id}/${res?.data[0]?.slug}`);
        } else if (data?.siteName) {
          // setSearchListName(data?.cityName);
          setSearchName("");
          navigate(`/search-sites/${data?._id}/${data?.siteName}`);
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
  // search end

  // get Search data
  const getSearchData = async () => {
    const sendData = {
      id: params?.id,
    };

    setIsLoading(true);

    let res;
    if (loginStatus) {
      res = await HomeService.homePageSearchWithToken(sendData);
    } else {
      res = await HomeService.homePageSearch(sendData);
    }

    console.log("resAll", res);

    if (res && res?.status) {
      setIsLoading(false);
      setSearchResData(res?.data);
      setAllActivitydata(res?.data?.All_activity);
    } else {
      setIsLoading(false);
      toast.error(toast?.message || "Something Went Wrong");
    }
  };

  const handleDateSearch = async (date) => {
    setStartDate(date);

    const data = {
      id: params.id,
      startDate: moment().format(),
      endDate: moment(date).format(),
    };
    setIsLoading(true);
    const res = await HomeService.searchWithDate(data);
    if (res && res?.status) {
      setAllActivitydata(res?.data);
      let element = document.getElementById("allActivity");
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  // range date
  const handleRangeDateSearch = async (date) => {
    setDateRange([date.selection]);
  };

  const searchDateClick = async () => {
    // console.log("dateDDD", date?.selection?.endDate)
    const startDate = dateRange?.[0]?.startDate;
    const endDate = dateRange?.[0]?.endDate;

    const data = {
      id: params.id,
      startDate: moment(startDate).format(),
      endDate: moment(endDate).format(),
    };

    console.log("startDate", startDate);

    setIsLoading(true);
    const res = await HomeService.searchWithDate(data);
    console.log("resReaddf", res);
    if (res && res?.status) {
      setAllActivitydata(res?.data);

      let element = document.getElementById("allActivity");
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      setIsLoading(false);
      setOpenDateCalander(false);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const clearRangeDate = () => {
    setDateRange(initDateRange);
    setAllActivitydata(searchData?.All_activity);

    // let element = document.getElementById("allActivity");
    // element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  useEffect(() => {
    getSearchData();
    setSearchNameDefault(params.city);
  }, [loginStatus, params]);

  return (
    <>
      <MainLoader isLoading={isLoading} />

      <section
        className="tabingPart"
        style={{ paddingTop: "27px" }}
        onClick={() => {
          setSearchName("");
          setOpenDateCalander(false);
        }}
      >
        <div className="container">
          <div className="searchDateDiv">
            <div className="searchbox">
              {/* search */}
              <form
                className="whereSearchFrm"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="whreSaeFrmDiv">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input
                    value={searchNameDefault || searchName}
                    placeholder="Where are you going?"
                    onChange={(e) => handleChangeSearch(e)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (searchNameDefault) {
                        handleSearchDefaultClick();
                      }
                    }}
                  />

                  {searchName && (
                    <div
                      className="nav-search-dropdown"
                      style={{ width: "100%" }}
                    >
                      {searchListLoad ? (
                        <div className="d-flex justify-content-start">
                          Loading...
                        </div>
                      ) : (
                        searchListData?.map((item, i) => {
                          return (
                            <div
                              key={i}
                              onClick={() => handleListClick(item)}
                              className="searInnerDiv"
                            >
                              <div className="searInnerFig">
                                <img
                                  src={
                                    item?.picture ||
                                    item?.image ||
                                    item?.images ||
                                    emptyLocation
                                  }
                                  alt=""
                                />
                              </div>
                              <div>
                                {item?.name && <p>{item?.name}</p>}
                                {item?.cityName && (
                                  <p>
                                    {item?.cityName}, {item?.countryname}
                                  </p>
                                )}
                                {item?.activityTitle && (
                                  <p>{item?.activityTitle}</p>
                                )}
                                {item?.siteName && (
                                  <p>
                                    {item?.siteName}, {item?.cityname}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}

                      {!searchListLoad && searchListData?.length === 0 && (
                        <div className="d-flex justify-content-start">
                          No Data Found...
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      handleListClick(searchListData[0]);
                    }}
                  >
                    Search
                  </button>
                </div>
              </form>

              {/*Add date */}
              <form action="" className="activityHeaderFrom">
                <div
                  className="Datepicker_wrap myDatePickerDiv"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDateCalander(!openDateCalander);
                  }}
                >
                  {/* <DatePicker
                    selected={startDate}
                    onChange={(date) => handleDateSearch(date)}
                  /> */}
                  <button
                    className="calenderbtn sPageClndr"
                    onClick={(e) => e.preventDefault()}
                  >
                    Add Date
                    {/* <i class="fa-regular fa-calendar-days"></i> */}
                  </button>
                  <div className="arrow_">
                    <i class="fa-solid fa-angle-down"></i>
                  </div>
                </div>
              </form>

              {/* range calander */}
              {openDateCalander && (
                <div
                  className="range-date-picker"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <DateRange
                      editableDateInputs={true}
                      // onChange={item => setDateRange([item.selection])}
                      onChange={(date) => handleRangeDateSearch(date)}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                    />
                  </div>
                  <div style={{ border: "1px solid #b3a5a5" }} />
                  <div className="d-flex justify-content-between p-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => clearRangeDate()}
                    >
                      Clear
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={searchDateClick}
                    >
                      Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* names */}
        <div className="container mt-4">
          <p className="thingsSmallHead">Things to do in</p>
          <p className="cityNameHead">{params.city}</p>
        </div>

        {/* <div className='container'>
          <div className='showMDivBtn'>
            <button className='showMoreBtn' onClick={handleClick}>Show More</button>
          </div>
        </div>

        <div className='container'>
          <div className='mainSearchDiv'>
            <Swiper
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
              navigation={true}
              modules={[Navigation]}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              className='mySearchSwiper'
            >
              <SwiperSlide>
                <div className='searchPageSeDiv searchActivePageSeDiv'>
                  <div className='searchActive'>
                    <figure className='searchPFgi'>
                      <img src={searchImg} alt="search..." />
                    </figure>
                  </div>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='searchPageSeDiv'>
                  <figure className='searchPFgi'>
                    <img src={searchImg} alt="search..." />
                  </figure>
                  <p className='underSearch'>Museums & exhibitions</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div> */}

        <TopActivies searchData={searchData} getSearchData={getSearchData} />

        {/* <TopSites searchData={searchData} /> */}
        <div id="allActivity">
          <AllActivity
            activities={activities}
            searchData={allActivityData}
            getSearchData={getSearchData}
          />
        </div>

        {/* <RecommendedActivities /> */}
        {/* <Questions /> */}
        {/* <TopSearchedAttractions /> */}
        {/* <ThingstodoNewDelhi /> */}
        {/* <CitiesIndia /> */}

        {/* Other Sightseeing Options */}
        {/* <div className='container mt-4'>
          <p className='topActHead'>Other Sightseeing Options in New Delhi</p>
          <p className='wantPara'>Want to discover all there is to do in New Delhi?
            <Link to='/'>Click here for a full list.</Link></p>
        </div> */}

        {/* <Peoplesayingsearchpageparis /> */}
        {/* <PopularGuide /> */}
      </section>

      {modalA && <DiscoverModal closeModal={setModalA} />}
    </>
  );
};

export default Search;
