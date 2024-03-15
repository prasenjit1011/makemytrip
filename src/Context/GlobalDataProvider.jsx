import { useContext, createContext, useState, useEffect } from "react";
import {
  getAllActivitySites,
  getAllTopCountries,
  getPastWishlistActivities,
  getTopCities,
  getUserWishlistFolders,
} from "../API_HELPERS/apiHelpers";
import { useAuth } from "./AuthContextProvider";

const globalDataCtx = createContext({});
export const useGlobalDataCtx = () => useContext(globalDataCtx);

const GlobalDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedTopCountries, setFetchedTopCountries] = useState([]);
  const [fetchedTopCities, setFetchedTopCities] = useState([]);
  const [fetchedTopActivitySites, setFetchedTopActivitySites] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchListName, setSearchListName] = useState("");
  const [folders, setFolders] = useState([]);
  const [fetchedPastWishlist, setFetchedPastWishlist] = useState([]);
  const { loginStatus } = useAuth();
  console.log("fetchedTopActivitySites", fetchedTopActivitySites);
  const fetchAllTopCountries = async () => {
    try {
      setIsLoading(true);
      const res = await getAllTopCountries();
      if (res && res?.status) {
        setFetchedTopCountries(
          res?.data?.sort(
            (item1, item2) => item1?.topPriority - item2?.topPriority
          )
        );
      } else {
        console.log("ERROR FETCHING TopCountries", res?.message, res);
      }
    } catch (error) {
      console.log("ERROR FETCHING TopCountries", error?.message, error);
    }
    setIsLoading(false);
  };
  const fetchAllTopCities = async () => {
    try {
      setIsLoading(true);
      const res = await getTopCities();
      if (res && res?.status) {
        console.log("gjhgjhhjk", res);
        setFetchedTopCities(
          res?.data?.sort((a, b) => a?.topPriority - b?.topPriority)
        );
      } else {
        console.log("ERROR FETCHING TopCities", res?.message, res);
      }
    } catch (error) {
      console.log("ERROR FETCHING TopCities", error?.message, error);
    }
    setIsLoading(false);
  };
  const fetchAllTopActitvitySites = async () => {
    try {
      setIsLoading(true);
      const res = await getAllActivitySites();
      if (res && res?.status) {
        setFetchedTopActivitySites(res?.data);
      } else {
        console.log("ERROR FETCHING TopActivitySites", res?.message, res);
      }
    } catch (error) {
      console.log("ERROR FETCHING TopActivitySites", error?.message, error);
    }
    setIsLoading(false);
  };

  const fetchWishListFolders = async () => {
    try {
      setIsLoading(true);
      const res = await getUserWishlistFolders();
      if (res && res?.status) {
        setFolders(res?.data);
      } else {
        console.log("Error fetching folders", res);
      }
    } catch (error) {
      console.log("Error fetching folders", error);
    }
    setIsLoading(false);
  };
  const fetchPastWishlist = async () => {
    try {
      setIsLoading(true);
      // setFolderId(id);

      const res = await getPastWishlistActivities();
      if (res && res?.status) {
        setFetchedPastWishlist(res?.data);
      } else {
        console.log("Error fetching Past WISHLIST", res);
      }
    } catch (error) {
      console.log("Error fetching Past WISHLIST", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTopCountries();
    fetchAllTopCities();
    fetchAllTopActitvitySites();
  }, []);

  useEffect(() => {
    if (loginStatus) {
      fetchWishListFolders();
      fetchPastWishlist();
    } else {
      setFolders([]);
      setFetchedPastWishlist([]);
    }
  }, [loginStatus]);

  return (
    <globalDataCtx.Provider
      value={{
        isLoading,
        fetchAllTopCountries,
        fetchAllTopCities,
        fetchAllTopActitvitySites,
        fetchedTopCountries,
        fetchedTopCities,
        fetchedTopActivitySites,
        searchData,
        setSearchData,
        setSearchListName,
        searchListName,
        folders,
        setFolders,
        fetchWishListFolders,
        fetchPastWishlist,
        fetchedPastWishlist,
        setFetchedPastWishlist,
      }}
    >
      {children}
    </globalDataCtx.Provider>
  );
};

export default GlobalDataProvider;
