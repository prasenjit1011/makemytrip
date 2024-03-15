import React, { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import 'react-calendar/dist/Calendar.css';
import { Link, useParams } from "react-router-dom";
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

const SearchSites = ({ activities = [] }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { loginStatus } = useAuth();
  const params = useParams();

  const [modalA, setModalA] = useState(false);
  const handleClick = () => {
    setModalA(!modalA);
  };

  const [value, onChange] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  console.log("searchDataSite", searchData);

  const getSearchData = async () => {
    const sendData = {
      id: params?.id, 
    };


    setIsLoading(true);
    let res;
    // if (loginStatus) {
    //   res = await HomeService.homePageSearchWithToken(sendData);
    // } else {
    res = await HomeService.homePageSearch(sendData);
    // }
    console.log("searchResSite data =====================", res);
    if (res && res?.status) {
      setIsLoading(false);
      setSearchData(res?.data);
    } else {
      setIsLoading(false);
      toast.error(toast?.message || "Something Went Wrong");
    }
  };

  useEffect(() => {
    getSearchData();
  }, [loginStatus]);

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="tabingPart" style={{ paddingTop: "27px" }}>
        {/* names */}
        <div className="container mt-4">
          <p className="thingsSmallHead">Things to do in</p>
          <p className="cityNameHead">{params.city}</p>
        </div>

        {/* <TopActivies tempData={tempData} searchData={searchData} /> */}
        {/* <TopSites searchData={searchData} /> */}
        <AllActivity
          activities={activities}
          searchData={searchData}
          getSearchData={getSearchData}
          // heading="Sites"
        />

        {/* <RecommendedActivities /> */}
        {/* <Questions /> */}
        {/* <TopSearchedAttractions /> */}
        {/* <ThingstodoNewDelhi /> */}
        {/* <CitiesIndia /> */}

        {/* Other Sightseeing Options */}

        {/* <Peoplesayingsearchpageparis /> */}
        {/* <PopularGuide /> */}
      </section>

      {modalA && <DiscoverModal closeModal={setModalA} />}
    </>
  );
};

export default SearchSites;
