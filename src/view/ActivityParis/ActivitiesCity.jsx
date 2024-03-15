import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

import ActivitiesActivities from "../Activities/ActivitiesActivities";
import BannerThings from "../Activities/BannerThings";

import union1 from "../../assets/Images/actvitiesParis/Union1.png";
import union2 from "../../assets/Images/actvitiesParis/Union2.png";
import union3 from "../../assets/Images/actvitiesParis/Union3.png";
import union4 from "../../assets/Images/actvitiesParis/Union4.png";
import union5 from "../../assets/Images/actvitiesParis/Union5.png";
import union6 from "../../assets/Images/actvitiesParis/Union6.png";
import ActivityGuidedTourSlider from "./ActivityGuidedTourSlider";
import TopSightsInParis from "./TopSightsInParis";
import AvailableActivities from "./AvailableActivities";
import ImmersiveExperience from "./ImmersiveExperience";
import PlanningToParis from "./PlanningToParis";
import GoBeyondParis from "./GoBeyondParis";
import Travel from "../Activities/Travel";
import ReadMoreAboutParis from "./ReadMoreAboutParis";
import SearchBox from "../Activities/SearchBox";
import Activities2 from "../Activities/Activities2";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import PlanningTripToParis from "./PlanningTripToParis";
import SightseeingParis from "./SightseeingParis";
import PeoplesayingParis from "./PeoplesayingParis";
import TopDestinations from "./TopDestinations";
import TopAttraction from "../Activities/TopAttraction";
import Chapel from "../Activities/Chapel";
import Italy from "../Activities/Italy";
import ActivityService from "../../Service/ActivityService";
import { useNavigate, useParams } from "react-router-dom";
import HomeService from "../../Service/HomeService";
import {
  getAllActivitiesAgainstCityAndTourModule,
  getAllTourModules,
  getTopCities,
  getAllTopCountries,
  getAllActivitySites,
  filterSiteActivities,
  filterCityActivities,
} from "../../API_HELPERS/apiHelpers";
import useRatings from "../../Hooks/Ratings/useRatings";
import { toast } from "react-hot-toast";
import TopActivityCity from "./TopActivityCity";
import AllActivity from "../SearchPage/AllActivity";
import AllActivityCity from "./AllActivityCity";
import MainLoader from "../../components/Loaders/MainLoader";
import girl404 from "../../assets/girl404.gif";
import robot404 from "../../assets/robot404.gif";
import noResult from "../../assets/noResultAnimation.gif";
import { useGlobalDataCtx } from "../../Context/GlobalDataProvider";
import emptyLocation from "../../assets/Images/emptyLocation.png";

const activityItems = [
  { id: 1, img: union1, title: "Edinburgh" },
  { id: 2, img: union2, title: "Paris" },
  { id: 3, img: union3, title: "Albarello" },
  { id: 4, img: union4, title: "New York City" },
  { id: 5, img: union5, title: "Berlin" },
  { id: 6, img: union6, title: "Vienna" },
];
const INITIAL = {
  noFilter: false,
  minprice: "",
  maxprice: 999999999,
  time: [],
  catId: [],
  language: [],
  destination: [],
  duration: [],
  rating: 0,
};

const ActivitiesCity = () => {
  const { type, id } = useParams();
  console.log("baler id", id);
  const [showactivityflag, setshowactivityflag] = useState(true);
  const [fetchSearchactivity, setfetchSearchactivity] = useState([]);
  console.log("hhhuuu", fetchSearchactivity);
  const [cityDetail, setCityDetail] = useState(null);
  const [fetchedActivities, setFetchedActivities] = useState([]);
  // console.log("hhhuuu", fetchedActivities);
  const [fetchedTourModules, setFetchedTourModules] = useState([]);
  const [selectedTourModule, setSelectedTourModule] = useState("");
  const [fetchedAllcountry, setAllfetchcountry] = useState([]);
  const [fetchedAllcity, setAllfetchcity] = useState([]);
  const [fetchedAllsites, setAllfetchsites] = useState([]);

  const [activityType, setActivityType] = useState([]);
  const [primeryservicetype_id, setprimeryservicetype_id] = useState("");
  const [tourmodule_id, settourmodule_id] = useState("");

  // Filter Related states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(JSON.stringify(INITIAL))
  );
  const [isLoading, setIsLoading] = useState(false);
  const { ratingsComp, finalRating, resetter } = useRatings();
  const navigate = useNavigate();

  console.log("jkhgkjgh", selectedFilters);

  // ***********8search start
  const [formSticky, setFormSticky] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchListData, setSearchListData] = useState([]);
  const [searchListLoad, setSearchListLoad] = useState(false);
  const { setSearchData, setSearchListName, folders } = useGlobalDataCtx();

  function setFormFixed() {
    if (window.scrollY > 180) {
      setFormSticky(true);
    } else {
      setFormSticky(false);
    }
  }

  window.addEventListener("scroll", setFormFixed);

  const handleListClick = async (data) => {
    // alert("k");
    console.log("hdvl", data);
    if (!searchName)
      return toast.error("Please enter the keyword to be searched");
    // return
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
        toast.error("Search Results Not Found ");
      }
      setIsLoading(false);
    } else {
      toast.error(res.message || "Something went wrong!");
      setIsLoading(false);
    }
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
  //****************** */ search end

  const resetFilter = () => {
    // alert("uu");
    // fetchActivityAgainstSite();
    // resetter();
    setSelectedFilters(INITIAL);
    // setSelectedFilters(JSON.parse(JSON.stringify(INITIAL)));
    // setShowFilterModal(false);
  };
  const [tab, setTab] = useState(
    new URLSearchParams(window.location.search).get("currentTab")
  );

  console.log("TSB", tab);
  const [currentTabId, setCurrentTabId] = useState(
    new URLSearchParams(window.location.search).get("currentTab")
  );

  const SelectTabHandle = (id) => {
    let url = new URL(window.location.href);
    url.searchParams.set("currentTab", id);
    window.history.replaceState({}, "", url.href);
    console.log("URL", url.searchParams.get("currentTab"));
    setCurrentTabId(id);
    // fetchBanner(id);
  };
  useEffect(() => {
    const fecthActivityType = () => {
      HomeService.activityType().then((res) => {
        if (res && res.status) {
          console.log("ativijjty fucking", res.data);
          setprimeryservicetype_id(res?.data[0]?._id);
          setActivityType(res.data);
        }
      });
    };
    fecthActivityType();
  }, []);
  useEffect(() => {
    fetchAllTourModuleAgainstCity(id);
  }, [activityType]);
  //........................Filter function.........

  const applyFilter = async () => {
    // alert("ii");
    if (!id || !activityType) return;

    if (selectedFilters["minprice"] == "") {
      selectedFilters["minprice"] = 0;
    }
    const data = JSON.parse(JSON.stringify(selectedFilters));

    if (finalRating === 0) {
      delete data.rating;
    } else {
      data.rating = +finalRating;
    }
    console.log("selectedFilters", selectedFilters["minprice"]);

    console.log("selectedFilters", data);
    // return;

    try {
      setIsLoading(true);
      let res;
      res = await filterCityActivities(id, primeryservicetype_id, data);

      if (res && res?.status) {
        // setActivities(res?.data?.[0]?.all_activity);

        console.log("uurr", res?.data[0]?.all_activity);
        setIsLoading(false);
        // setFetchedActivities(res?.data[0]);
        setfetchSearchactivity(res?.data[0]?.all_activity);
        setshowactivityflag(false);
        setShowFilterModal(false);
      } else {
        toast.error(res?.message || "Something went wrong");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  const FetchAllCountries = async () => {
    try {
      setIsLoading(true);
      let res;

      res = await getAllTopCountries();
      console.log("countryDetails", res);
      if (res && res.status && res.data.length) {
        setAllfetchcountry(res.data);
        // setAllfetchcountry(res.data[0]);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const FetchAllCities = async () => {
    try {
      setIsLoading(true);
      let res;

      res = await getTopCities();
      console.log("cityDetails", res);
      if (res && res.status && res.data.length) {
        setAllfetchcity(res.data);
        // setAllfetchcountry(res.data[0]);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };
  const FetchAllSites = async () => {
    try {
      setIsLoading(true);
      let res;

      res = await getAllTopCountries();
      console.log("countryDetails", res);
      if (res && res.status && res.data.length) {
        setAllfetchsites(res.data);
        // setAllfetchcountry(res.data[0]);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const fetchActivitiesAgainstCityAndTourModule = async (
    primeryservicetype_id,
    cityId,
    tourModuleId
  ) => {
    try {
      setIsLoading(true);
      console.log(
        "activity getting",
        primeryservicetype_id,
        cityId,
        tourModuleId
      );
      let res;
      let data = {
        date: "",
      };
      res = await getAllActivitiesAgainstCityAndTourModule(
        primeryservicetype_id,
        cityId,
        tourModuleId,
        data
      );
      console.log("AllActivitiesAgainstCityAndTourModule", res);
      if (res && res?.status) {
        setSelectedTourModule(tourModuleId);
        setFetchedActivities(res?.data[0]);
        localStorage.setItem("topactivity", JSON.stringify(res?.data[0]));
      } else {
        // toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      // toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const fecthCityDetail = async () => {
    try {
      setIsLoading(true);
      let res;

      res = await ActivityService.cityDetail(id);
      console.log("cityDetails", res);
      if (res && res.status && res.data.length) {
        setCityDetail(res.data[0]);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);

    // ActivityService.cityDetail(id).then(res => {
    //   console.log('cityDetails', res);
    //   if (res && res.status && res.data.length) {
    //     setCityDetail(res.data[0]);
    //   }
    // });
  };

  const fetchAllTourModuleAgainstCity = async (cityId) => {
    try {
      setIsLoading(true);
      let res;

      res = await getAllTourModules(cityId);
      console.log("TourModules", res);
      if (res && res?.status) {
        setFetchedTourModules(res?.data);
        settourmodule_id(res?.data?.[0]?._id);
        console.log("primeryservicetype_id 1", primeryservicetype_id);

        fetchActivitiesAgainstCityAndTourModule(
          primeryservicetype_id,
          cityId,
          res?.data?.[0]?._id
        );
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchAllTourModuleAgainstCity(id);
    fecthCityDetail();
    FetchAllCountries();
    FetchAllCities();
    FetchAllSites();
  }, [id]);
  //...................... controling search..
  const [stickyFix, setStickyFix] = useState(false);
  function setFixed() {
    if (window.scrollY > 400) {
      setStickyFix(true);
    } else {
      setStickyFix(false);
    }
  }

  // console.log(window.location.hash);
  // console.log("Location", location);
  window.addEventListener("scroll", setFixed);

  return (
    <section>
      <div className="row tabingBtnPart mycs">
        <div
          className={stickyFix ? "tabingBtnPartCol fixed" : "tabingBtnPartCol"}
        >
          <ul className="nav nav-tabs tabingBtnPartTabs" role="tablist">
            {activityType?.map((item) => {
              console.log("ativijjty", item);
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
                    onClick={() => {
                      fetchActivitiesAgainstCityAndTourModule(
                        item._id,
                        id,
                        tourmodule_id
                      );
                      setshowactivityflag(true);
                    }}
                  >
                    <div className="navTabIconParent">
                      <img src={item.logo} className="img-fluid" alt="icon" />
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

      <MainLoader isLoading={isLoading} />
      {/* Banner starts */}
      <div
        className="things-to-do "
        style={{ backgroundImage: `url(${cityDetail?.picture})` }}
      >
        <div className="thingInnerBanner">
          <div className="container-fluid pt-3 pb-3 px-5">
            {/* <SearchBox /> */}
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
                            console.log("kkkfkk", item);
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
            {/* ensdddddddddddddddddd */}
            <div className="ParisHeading ">
              <div>
                <h2 className="thingsText" style={{ color: "#6AFFF0" }}>
                  Things to do in
                </h2>
                <h2 className="parisMainText">{cityDetail?.cityName}</h2>
                <p className="parisDescriptionText">
                  A city so synonymous with
                  <span style={{ color: "#6AFFF0" }}> beauty </span>, even the
                  least <span style={{ color: "#6AFFF0" }}> romantic </span> are
                  defenceless against its charms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner ends */}
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
      <>
        <div className="custContain">
          <h4 className="headingTop">Tour Modules</h4>
        </div>
        <div className="custContain">
          {fetchedTourModules?.length > 0 && (
            <Swiper
              loop={true}
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loopedSlidesLimit={false}
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                1400: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
            >
              {fetchedTourModules.map((item, i) => {
                return (
                  <SwiperSlide>
                    <div
                      className="swipMainCityDiv"
                      style={{
                        borderBottom:
                          tourmodule_id === item?._id
                            ? "3px solid #f95d12"
                            : "0",
                      }}
                    >
                      <div
                        key={i}
                        className="swipCityDiv"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          fetchActivitiesAgainstCityAndTourModule(
                            primeryservicetype_id,
                            item?.cityId,
                            item?._id
                          );
                          settourmodule_id(item?._id);
                          setshowactivityflag(true);
                        }}
                      >
                        <img src={item?.image} alt={item?.name} />
                      </div>
                      <p className="activityItemsTitle">{item?.name}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
        {fetchedTourModules?.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={girl404}
              alt=""
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        )}
      </>
      {/* <ActivitiesActivities activities={fetchedActivities?.All_activity} /> */}
      {/* activity items starts*/}
      {/* <div className="activityItems d-flex mx-auto flex-wrap justify-content-center justify-content-lg-start px-5">
       
      </div> */}
      {/* <ActivityGuidedTourSlider activites={allActivity?.Top_activity} /> */}
      {showactivityflag && (
        <TopActivityCity activites={fetchedActivities?.Top_activity || []} />
      )}
      {/* <TopSightsInParis /> */}
      {/* <AvailableActivities activites={allActivity?.All_activity} itemsPerPage={8} /> */}
      {showactivityflag ? (
        <AllActivityCity activites={fetchedActivities?.All_activity || []} />
      ) : (
        <AllActivityCity activites={fetchSearchactivity || []} />
      )}

      {/* <ImmersiveExperience />

      <PlanningToParis />

      <GoBeyondParis />

      <Travel title="Your Paris itinerary is waiting" />

      <ReadMoreAboutParis />

      <Activities2 headLine1="Our most recommended things to do in Paris" /> */}
      {/* <FrequentlyAskedQuestions /> */}
      {/* <PlanningTripToParis /> */}
      {/* <TopAttraction /> */}
      {/* <Chapel /> */}
      {/* <Italy /> */}
      {/* <SightseeingParis cityDetail={cityDetail} />

      <PeoplesayingParis cityDetail={cityDetail} /> */}
      <TopDestinations
        setshowactivityflag={setshowactivityflag}
        fetchedTopCountries={fetchedActivities}
        fetchedTopCities={fetchedAllcity}
        fetchedTopActivitySites={fetchedAllsites}
      />
    </section>
  );
};

export default ActivitiesCity;
