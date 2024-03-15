import React from "react";
import "../../App.css";
import HeaderFilter from "../../components/HeaderFilter";
import CulturalSites from "./CulturalSites";
import AweInspiring from "./AweInspiring";
import TopCategories from "./TopCategories";
import { useHome } from "../../Context/HomeContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Activity from "./Activity";
import MainLoader from "../../components/Loaders/MainLoader";
import { useNavigation } from "react-router-dom";
import { getInformation, getSitemap } from "../../API_HELPERS/apiHelpers";

const Home = () => {
  const navigation = useNavigation();
  console.log("state", navigation.state);
  const { fetchBanner, fecthActivityType, isLoading } = useHome();
  let location = useLocation();
  if (location?.state?.flag) {
    console.log("ghgkll", location);
    window.location.reload();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    fetchBanner();
    fecthActivityType();
  }, []);

  return (
    <>
      <MainLoader isLoading={isLoading || navigation.state === "loading"} />
      <HeaderFilter />
      <Activity />
      <CulturalSites />
      <AweInspiring />
      <TopCategories />
    </>
  );
};

export default Home;
