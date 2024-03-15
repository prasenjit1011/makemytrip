import React, { useEffect, useState } from 'react';
import AuthService from '../Service/AuthService';
import HttpClient from '../utils/HttpClient';
const authContext = React.createContext();

export const useAuth = () => React.useContext(authContext);

const AuthContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(() => localStorage.getItem('login') || false);
  const [userData, setUserData] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [fetchedActivityTypes, setFetchedActivityTypes] = useState([]);

  const fetchUser = async () => {
    try {
      setIsChecking(true);
      const userRes = await AuthService.getProfile();
      console.log('userRes', userRes);

      if (userRes && userRes?.status) {
        setLoginStatus(true);
        setUserData(userRes?.data?.[0]);
        setIsChecking(false);
        return;
      } else {
        setIsChecking(false);
        console.log('User not logged In', userRes);
      }
    } catch (error) {
      setIsChecking(false);
      console.log('User not logged In', error);
    }

    setUserData(null);
    localStorage.clear();
    setLoginStatus(false);
  };
  const fetchActivityTypes = async () => {
    try {
      let res = await HttpClient.requestData('v1/user/viewActivityType');
      if (res && res.status) {
        console.log('TEST', res?.data?.[0]?._id);
        setFetchedActivityTypes(res?.data);
      } else {
        console.log('ERROR FETCHING ACTIVITY TYPES', res);
      }
    } catch (error) {
      console.log('ERROR FETCHING ACTIVITY TYPES', error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchActivityTypes();
  }, [loginStatus]);

  return (
    <authContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        userData,
        fetchUser,
        isChecking,
        showSignUpModal,
        setShowSignUpModal,
        showLoginModal,
        setShowLoginModal,
        fetchActivityTypes,
        fetchedActivityTypes,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
