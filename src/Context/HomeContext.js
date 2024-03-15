import React, { useState } from 'react';
import HomeService from '../Service/HomeService';
import { useLoaderData } from 'react-router-dom';
import { data } from 'autoprefixer';

const homeContext = React.createContext();

export const useHome = () => React.useContext(homeContext);

function HomeContext({ children }) {
  // const loaderData = useLoaderData();

  const [isLoading, setIsLoading] = useState(false);
  const [currentTabId, setCurrentTabId] =
   useState(new URLSearchParams(window.location.search).get('currentTab'));
  const [activityType, setActivityType] = useState([]);
  console.log("activitytyoe",activityType)
  const [bannerData, setBannerData] = useState(null);
  const [section, setSection] = useState([]);
  const fetchBanner = async id => {
    let tab = new URLSearchParams(window.location.search).get('currentTab');
    try {
      setIsLoading(true);
      const res = await HomeService.banner(tab);
      if (res && res.status && res.data.length > 0) {
        setBannerData(res.data[0]);
        fetchSection(tab);
      }
    } catch (error) {}
    setIsLoading(false);
    // HomeService.banner(tab).then(res => {
    //   console.log('banner', res);
    //   if (res && res.status && res.data.length > 0) {
    //     setBannerData(res.data[0]);
    //     fetchSection(tab);
    //   }
    // });
  };

  const fecthActivityType = () => {
    HomeService.activityType().then(res => {
      if (res && res.status) {
        setActivityType(res.data);
      }
    });
  };

  const fetchSection = () => {
    let tab = new URLSearchParams(window.location.search).get('currentTab');

    HomeService.section(tab).then(res => {
      if (res && res.status) { 
        setSection(res.data);
      }
    });
  };

  return (
    <homeContext.Provider
      value={{
        activityType,
        bannerData,
        fetchBanner,
        fecthActivityType,
        fetchSection,
        section,
        setCurrentTabId,
        currentTabId,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </homeContext.Provider>
  );
}

export default HomeContext;
