import React, { useEffect, useState } from "react";

import ActivitiesHeader from "./ActivitiesHeader";
import BannerThings from "./BannerThings";
import ActivitiesActivities from "./ActivitiesActivities";
import TourList from "./TourList";
import TopSight from "./TopSight";
// import Naples from './Naples';
// import TopAttraction from './TopAttraction';
// import Chapel from './Chapel';
// import Italy from './Italy';
// import Other from './Other';
// import People from './People';
// import Sara from './Sara';
// import Review from './Review';
// import Comment from './Comment';
import Activities2 from "./Activities2";
// import Travel from './Travel';
import TopSightsNearChapel from "./TopSightsNearChapel";
import ActivityService from "../../Service/ActivityService";
import { useParams } from "react-router-dom";
import MainLoader from "../../components/Loaders/MainLoader";
import useRatings from "../../Hooks/Ratings/useRatings";
import {
  filterSiteActivities,
  // getAllActivitiesAgainstCityAndTourModule,
  // getAllTourModules,
  getPopularActivitiesAgainstCity,
  getTypeAgainstSities,
} from "../../API_HELPERS/apiHelpers";
import { toast } from "react-hot-toast";

const INITIAL = {
  noFilter: false,
  minprice: "",
  maxprice: 999999999,
  time: [],
  catId: [],
  language: [],
  destination: [],
  duration: [],
  rating: "",
};

const Activities = () => {
  const { type, id } = useParams();
  const [siteDetail, setSiteDetail] = useState(null);
  const [activities, setActivities] = useState([]);

  // Filter Related states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(JSON.stringify(INITIAL))
  );
  const [isLoading, setIsLoading] = useState(false);
  const { ratingsComp, finalRating, resetter } = useRatings();
  const [cityActivities, setCityActivities] = useState([]);
  const [otherSites, setOtherSites] = useState([]);

  const fetchOtherSites = async () => {
    try {
      setIsLoading(true);
      // Fetching other sites using activity type id
      const res = await getTypeAgainstSities(type);
      if (res && res?.status) {
        setOtherSites(res?.data?.filter((item) => item?._id !== id));
        console.log("otherSites", res);
      } else {
        console.log("ERROR FETCHING otherSites", res);
      }
    } catch (error) {
      console.log("ERROR FETCHING otherSites", error);
    }
    setIsLoading(false);
  };

  const fetchPopularActivitiesAgainstCity = async (cityId) => {
    try {
      setIsLoading(true);
      let res;

      res = await getPopularActivitiesAgainstCity(cityId);
      console.log("PopularActivitiesAgainstCity", res);
      if (res && res?.status) {
        setCityActivities(res?.data);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  // const fetchActivitiesAgainstCityAndTourModule = async (cityId, tourModuleId) => {
  //   try {
  //     setIsLoading(true);
  //     let res;

  //     res = await getAllActivitiesAgainstCityAndTourModule(cityId, tourModuleId);
  //     console.log('AllActivitiesAgainstCityAndTourModule', res);
  //     if (res && res?.status) {
  //       setCityActivities(res?.data?.[0]?.Top_activity);
  //     } else {
  //       toast.error(res?.message || 'Something went wrong');
  //     }
  //   } catch (error) {
  //     toast.error(error?.message || 'Something went wrong');
  //   }
  //   setIsLoading(false);
  // };

  // const fetchAllTourModuleAgainstCity = async cityId => {
  //   try {
  //     setIsLoading(true);
  //     let res;

  //     res = await getAllTourModules(cityId);
  //     console.log('TourModules', res);
  //     if (res && res?.status) {
  //       fetchActivitiesAgainstCityAndTourModule(cityId, res?.data?.[0]?._id);
  //     } else {
  //       toast.error(res?.message || 'Something went wrong');
  //     }
  //   } catch (error) {
  //     toast.error(error?.message || 'Something went wrong');
  //   }
  //   setIsLoading(false);
  // };

  const fetchActivityAgainstSite = async () => {
    try {
      setIsLoading(true);
      // console.log("type_ID", type, id)
      const res = await ActivityService.siteAgainstActivity(type, id);
      console.log("resActt", res);
      if (res && res?.status) {
        setActivities(res?.data[0]?.all_activity);
        console.log("ACTIVITIES AGAINST SITES", res?.data[0]?.all_activity);
      } else {
        console.log("ERORR FETCHING ACTIVITIES AGAINST SITES", res);
      }
    } catch (error) {
      console.log("ERORR FETCHING ACTIVITIES AGAINST SITES", error);
    }

    setIsLoading(false);
  };

  const fetchSiteDetail = () => {
    ActivityService.siteDetail(id).then((res) => {
      console.log("siteDeatik", res);
      if (res && res.data.length > 0 && res.status) {
        setSiteDetail(res.data[0]);
        fetchPopularActivitiesAgainstCity(res?.data[0]?.cityId);
      }
    });
  };

  const resetFilter = () => {
    fetchActivityAgainstSite();
    resetter();
    setSelectedFilters(JSON.parse(JSON.stringify(INITIAL)));
    setShowFilterModal(false);
  };
  const applyFilter = async () => {
    if (isLoading) return;
    if (!id || !type) return;
    const data = JSON.parse(JSON.stringify(selectedFilters));
    if (finalRating === 0) {
      delete data.rating;
    } else {
      data.rating = +finalRating;
    }
    try {
      setIsLoading(true);
      let res;
      res = await filterSiteActivities(id, type, data);
      if (res && res?.status) {
        setActivities(res?.data?.[0]?.all_activity);
        setShowFilterModal(false);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  useEffect(() => {
    fetchSiteDetail();
    fetchActivityAgainstSite();
    fetchOtherSites();
  }, [id]);

  return (
    <div>
      <MainLoader isLoading={isLoading} />
      <ActivitiesHeader siteDetail={siteDetail} />

      <BannerThings
        resetFilter={resetFilter}
        applyFilter={applyFilter}
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        ratingsComp={ratingsComp}
      />

      <ActivitiesActivities activities={activities} />
      <TourList activities={activities} />
      {otherSites?.length > 0 && <TopSight siteDetail={siteDetail} />}
      {otherSites?.length > 0 && (
        <TopSightsNearChapel otherSites={otherSites} activityTypeId={type} />
      )}
      {/* <Naples /> */}
      {/* <Travel title="Your Travel Journey" colorText="Starts Here" /> */}
      {cityActivities?.length > 0 && (
        <Activities2
          headLine1={`${siteDetail?.siteName} : Our`}
          headLine2="most recommended"
          headLine3="activities"
          cityActivities={cityActivities}
        />
      )}
      {/* <TopAttraction /> */}
      {/* <Chapel /> */}
      {/* <Italy /> */}
      {/* <Other /> */}
      {/* <People /> */}
      {/* <Sara /> */}
      {/* <Review /> */}
      {/* <Comment /> */}
    </div>
  );
};

export default Activities;
