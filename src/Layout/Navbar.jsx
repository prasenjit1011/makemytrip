import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/Images/user.png";
import logo from "../assets/Images/Thingstodooo LOGO.png";
import settings from "../assets/Images/signUpHover/settings.png";
import gift from "../assets/Images/signUpHover/gift.png";
import clock from "../assets/Images/signUpHover/clock.png";
import Logout from "../assets/Images/signUpHover/Logout.png";
import tickets from "../assets/Images/signUpHover/tickets.png";
import United from "../assets/Images/united-states.png";
import mexico from "../assets/Images/mexico.png";
import kingdom from "../assets/Images/united-kingdom.png";
import australia from "../assets/Images/australia.png";
import spain from "../assets/Images/spain.png";
import india from "../assets/Images/india.png";
import { FaChevronDown } from "react-icons/fa";
import LoginModal from "../components/Modal/LoginModal";
import CreateAccountModal from "../components/Modal/CreateAccountModal";
import AuthService from "../Service/AuthService";
import HomeService from "../Service/HomeService";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContextProvider";
import toast from "react-hot-toast";
import { useHome } from "../Context/HomeContext";
import { useGlobalDataCtx } from "../Context/GlobalDataProvider";
import MainLoader from "../components/Loaders/MainLoader";
import searchListLoader from "../assets/greenSpinner.gif";
import blogLady from "../assets/Images/blogLady.jpg";
import emptyLocation from "../assets/Images/emptyLocation.png";
import { useCartContext } from "../Context/CartProvider";
import { getUserWishlistFolders } from "../API_HELPERS/apiHelpers";

const Navbar = () => {
  const location = useLocation();
  const lang = new URLSearchParams(window.location.search).get("lan");
  const navigate = useNavigate();
  const {
    loginStatus,
    setLoginStatus,
    isChecking,
    showSignUpModal,
    setShowSignUpModal,
    showLoginModal,
    setShowLoginModal,
    fetchedActivityTypes,
    userData,
  } = useAuth();
  // const { setCurrentTabId } = useHome();

  // const [showSignUpModal, setShowSignUpModal] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // search
  const { setSearchData, setSearchListName, folders } = useGlobalDataCtx();
  const [searchListData, setSearchListData] = useState([]);
  const [searchListLoad, setSearchListLoad] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isProfileModal, setIsProfileModal] = useState(false);

  const { cart } = useCartContext();

  console.log("isProfileModal", isProfileModal);

  const checklogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Save it!
      console.log("Thing was saved to the database.");
      logOutHandler();
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  const logOutHandler = () => {
    // if (!window.confirm("Are you sure ?")) return;
    localStorage.clear();
    setLoginStatus(false);
    // navigate('/')
    // window.location.reload();
    toast.success("User logged out successfully");
  };

  const [languages, setLanguages] = useState([]);

  const [selectedCurrency, setSelectedCurrency] = useState("INR(₹)");
  const [selectedLang, setSelectedLang] = useState("English");

  const signUp = [
    { id: 1, title: "Booking", linkto: "/booking-history", icon: tickets },
    // { id: 2, title: 'History', linkto: '/browsing-history', icon: clock },
    { id: 2, title: "My GiftCoupon", linkto: "/myGiftcoupon", icon: gift },
    { id: 3, title: "Settings", linkto: "/settings", icon: settings },

    { id: 4, title: "Log Out", linkto: "/", icon: Logout },
  ];

  const TopCurrency = [
    { id: 1, title: "Indian Rupee", icon: "₹", shortCur: "INR(₹)" },
    { id: 2, title: "Euro", icon: "€", shortCur: "EUR(€)" },
    { id: 3, title: "U.S. Dollar", icon: "US$", shortCur: "USD(US$)" },
    { id: 4, title: "British Pound", icon: "£", shortCur: "GBP(£)" },
    { id: 5, title: " Australian Dollar", icon: "A$", shortCur: "AUD(A$)" },
    { id: 6, title: " Swiss Franc", icon: "CHF", shortCur: "CHF(CHF)" },
  ];

  // const languages = [
  //   {
  //     id: 1,
  //     title: "English (United States)",
  //     icon: (
  //       <img src={United} className="img-fluid" alt="icon"/>
  //     ),
  //   },
  //   {
  //     id: 2,
  //     title: "Hindi (India)",
  //     icon: (
  //       <img src={india} className="img-fluid" alt="icon"/>
  //     ),
  //   },
  //   {
  //     id: 3,
  //     title: "Español (mexico)",
  //     icon: (
  //       <img src={mexico} className="img-fluid" alt="icon"/>
  //     ),
  //   },
  //   {
  //     id: 4,
  //     title: "English (Australia)",
  //     icon: (
  //       <img src={australia} className="img-fluid" alt="icon"/>
  //     ),
  //   },
  //   {
  //     id: 5,
  //     title: "English (United Kingdom)",
  //     icon: (
  //       <img src={kingdom} className="img-fluid" alt="icon"/>
  //     ),
  //   },
  //   {
  //     id: 6,
  //     title: "Italiano",
  //     icon: (
  //       <img src={spain} className="img-fluid" alt="icon"/>
  //     ),
  //   },
  // ];

  const selectHandler = (title) => setSelectedCurrency(title);
  const selectHandlerLang = (lang) => {
    window.location.replace("/?lan=" + lang);
  };

  const fetchLanguages = () => {
    HomeService.languages().then((res) => {
      // console.log("lang",res);
      if (res && res.status) {
        setLanguages(res.data);
      }
    });
  };

  // search start
  // const handleChangeSearch = async (e) => {
  //   setSearchName(e.target.value);
  //   const sendData = {
  //     searchname: e.target.value,
  //   };

  //   setSearchListLoad(true);
  //   const res = await HomeService.searchList(sendData);
  //   console.log("resSearchList", res);
  //   if (res && res?.status) {
  //     setSearchListData(res?.data);
  //     setSearchListLoad(false);
  //   } else {
  //     setSearchListLoad(false);
  //   }
  // };
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
  // const handleListClick = async (data) => {
  //   //  alert("k");
  //   console.log("rrrrw", data);
  //   if (!searchName)
  //     return toast.error("Please enter the keyword to be searched");
  //   // return

  //   let sendData = {};
  //   if (data?.activitySiteId) {
  //     sendData = {
  //       id: data?.activitySiteId,
  //     };
  //   } else {
  //     sendData = {
  //       id: data?._id,
  //     };
  //   }
  //   setIsLoading(true);
  //   const res = await HomeService.homePageSearch(sendData);
  //   console.log("searchRes", res);

  //   if (res && res?.status) {
  //     if (res?.data && res?.data?.length !== 0) {
  //       setSearchData(res?.data);

  //       if (data?.name) {
  //         // setSearchListName(data?.name);
  //         setSearchName("");
  //         navigate(`/search-countries/${data?._id}/${data?.name}`);
  //       } else if (data?.cityName) {
  //         setSearchListName(data?.cityName);
  //         setSearchName("");
  //         navigate(`/city/${data?._id}`);
  //         // navigate(`/search-cities/${data?._id}/${data?.cityName}`);
  //       } else if (data?.activityTitle) {
  //         setSearchListName(data?.activityTitle);
  //         setSearchName("");
  //         navigate(`/activity/${res?.data[0]?._id}/${res?.data[0]?.slug}`);
  //       } else if (data?.activitySiteId) {
  //         // setSearchListName(data?.cityName);
  //         setSearchName("");
  //         navigate(
  //           `/search-sites/${data?.activitySiteId}/${data?.activityTitle}`
  //         );
  //       }
  //     } else {
  //       toast.error("Search Results Not Found ! ");
  //     }
  //     setIsLoading(false);
  //   } else {
  //     toast.error(res.message || "Something went wrong!");
  //     setIsLoading(false);
  //   }
  // };
  // search end

  // show srarch or not
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

  const showSearchMemo = useMemo(() => {
    console.log(
      "locationnav",
      location.pathname.split("/").some((item) => item === "search-cities")
    );
    const searchCityPage = location.pathname
      .split("/")
      .some((item) => item === "search-cities");
    if (searchCityPage) {
      return false;
    } else {
      return true;
    }

    return true;
  }, [location]);

  console.log("showSearchMemo", showSearchMemo);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const accountBtn = (
    <button className="nav-link userGrandParent ml-auto fade-in">
      <figure className="userParent">
        {/* <i className="fa-solid fa-arrow-right-from-bracket fa-rotate-180" style={{ color: '#ffffff' }} /> */}
        <img src={user} alt="user" />
      </figure>
      {userData?.firstName}
    </button>
  );

  const loginBtn = (
    <button
      className="nav-link userGrandParent ml-auto fade-in"
      onClick={() => setShowLoginModal(true)}
    >
      <figure className="userParent">
        <img src={user} alt="user" />
      </figure>
      Sign In
    </button>
  );

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
  const searchOutsideClickHandler = (e) => {
    // console.log('LISTENING');
    const searchParent = document.querySelector("#searchParent");
    if (!searchParent?.contains(e.target)) {
      setSearchName("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", searchOutsideClickHandler);
    return () =>
      document.removeEventListener("mousedown", searchOutsideClickHandler);
  });

  return (
    <>
      <MainLoader isLoading={isLoading} />
      <section className="navBarSectionPart ">
        <div className="container-fluid containerFluidPart p-0">
          <nav className="navbar navbar-expand navbar-light navbarMainParent">
            {/* <a href="/" className="navbar-brand">
              <img src={logo} alt="logo" />
            </a> */}
            <a
              href={`/?lan=eng&currentTab=${fetchedActivityTypes?.[0]?._id}`}
              className="navbar-brand thingNavbarBrand"
            >
              <img src={logo} alt="logo" />
            </a>
            {/* <Link to={`/?lan=eng&currentTab=${fetchedActivityTypes?.[0]?._id}`} className="navbar-brand">
              <img src={logo} alt="logo" />
            </Link> */}

            {/* <button
              className="navbar-toggler navbarTogglerBtn mr-4"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon navbarTogleIcon "></span>
            </button> */}

            <div
              className="collapse navbar-collapse dialougeNavbarPart"
              id="navbarSupportedContent"
            >
              {/* search */}
              {showSearchMemo ? (
                <form
                  className="form-inline my-2 my-lg-0 whereFormClass d-none d-lg-flex"
                  id="searchParent"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Where are you going?"
                    aria-label="Search"
                    value={searchName}
                    onChange={(e) => {
                      handleChangeSearch(e);
                    }}
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                  {searchName && (
                    <div className="nav-search-dropdown">
                      {searchListLoad ? (
                        <div>Loading...</div>
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
                        <div>No Data Found...</div>
                      )}
                    </div>
                  )}

                  <div className="Search_btn">
                    <button
                      type="button"
                      title="Search"
                      className="btn"
                      onClick={() => {
                        handleListClick(searchListData[0]);
                      }}
                    >
                      Search
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  className="form-inline my-2 my-lg-0 whereFormClass d-none d-lg-flex"
                  id="searchParent"
                />
              )}

              <ul className="navbar-nav navbarPartUnorderList">
                <li className="nav-item navMarginLi LanguageWrapper">
                  <span className="nav-link d-flex align-items-center">
                    {selectedLang}
                    <FaChevronDown size={15} style={{ marginLeft: 10 }} />
                  </span>
                  <div className="appearOnHoverLang ml-auto">
                    <div className="bg-white list-unstyled rounded">
                      <h4 className="w-100 border-bottom">Languages</h4>

                      <div className="row ">
                        {languages.map((elemn) => {
                          const { _id, name, image, slug } = elemn;

                          return (
                            <div className="col-md-6 col-12" key={_id}>
                              <p
                                style={{
                                  whiteSpace: "nowrap",
                                  cursor: "pointer",
                                }}
                                data-select={name}
                                onClick={() => selectHandlerLang(slug)}
                              >
                                <span>
                                  {/* <img src={image} className="img-fluid" alt="icon" /> */}
                                  <i className="fa-solid fa-earth-asia"></i>
                                  &nbsp;
                                </span>
                                {name}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item navMarginLi currencyWrapper">
                  <span className="nav-link d-flex align-items-center">
                    {selectedCurrency}
                    <FaChevronDown size={15} style={{ marginLeft: 10 }} />{" "}
                  </span>
                  <div className="appearOnHoverInr ml-auto">
                    <div className="bg-white list-unstyled rounded">
                      <h4 className="w-100 border-bottom">Top Currency</h4>

                      <div className="row ">
                        {TopCurrency.map((elemn) => {
                          const { id, title, icon, shortCur } = elemn;

                          return (
                            <div className="col-lg-4 col-md-6 col-12" key={id}>
                              <p
                                // key={id}
                                style={{
                                  whiteSpace: "nowrap",
                                  cursor: "pointer",
                                }}
                                data-select={title}
                                onClick={() => selectHandler(shortCur)}
                              >
                                {title} <span>{icon}</span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="shopTDLi">
                    <Link to="/contact" className="nav-link">
                      <i class="fa-solid fa-circle-info"></i>
                      &nbsp;
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="shopTDLi">
                    <Link className="nav-link" to="/wishlist">
                      <i className="fa-regular fa-heart"></i>
                    </Link>
                    {loginStatus && folders?.length > 0 && (
                      <div className="wishShrtDiv"></div>
                    )}
                  </div>
                </li>
                <li className="nav-item">
                  <div className="shopTDLi">
                    <Link to="/add-to-cart" className="nav-link">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                    {loginStatus &&
                      cart?.cart_activity?.length +
                        cart?.cart_giftcard?.length >
                        0 && (
                        <div className="cartShrtDiv">
                          {cart?.cart_activity?.length +
                            cart?.cart_giftcard?.length || 0}
                        </div>
                      )}
                  </div>
                </li>

                <li
                  className="nav-item onHoverCurser ml-auto myOrangeUserBtn"
                  style={{ position: "relative", marginRight: "0" }}
                >
                  {!loginStatus ? loginBtn : accountBtn}
                  {loginStatus && (
                    <div className="appearOnHover ml-auto">
                      <ul className="bg-light list-unstyled rounded">
                        {signUp.map((elemn) => {
                          const { id, title, icon, linkto } = elemn;
                          if (title === "Log Out") {
                            return (
                              <p
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                key={id}
                              >
                                <li className="signUpWrapper">
                                  <img src={icon} alt="title" />
                                  <span onClick={checklogout}>{title}</span>
                                </li>
                              </p>
                            );
                          }
                          return (
                            <Link
                              to={linkto}
                              style={{ textDecoration: "none" }}
                              key={id}
                            >
                              <li className="signUpWrapper">
                                <img src={icon} alt="title" />
                                <span>{title}</span>
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>

                {/* responsive profile icon */}
                {loginStatus ? (
                  <li
                    className="nav-item d-block d-lg-none"
                    onClick={() => {
                      setIsProfileModal(!isProfileModal);
                    }}
                  >
                    <div className="shopTDLi">
                      <a className="nav-link">
                        <i class="fa-regular fa-circle-user"></i>
                      </a>
                    </div>

                    {/* profile modal for responsive */}
                    {loginStatus && isProfileModal && (
                      <div className="appearOnHover-res ml-auto">
                        <ul className="bg-light list-unstyled rounded">
                          {signUp.map((elemn) => {
                            const { id, title, icon, linkto } = elemn;
                            if (title === "Log Out") {
                              return (
                                <p
                                  style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                  }}
                                  key={id}
                                >
                                  <li className="signUpWrapper">
                                    <img src={icon} alt="title" />
                                    <span onClick={checklogout}>{title}</span>
                                  </li>
                                </p>
                              );
                            }
                            return (
                              <Link
                                to={linkto}
                                style={{ textDecoration: "none" }}
                                key={id}
                              >
                                <li className="signUpWrapper">
                                  <img src={icon} alt="title" />
                                  <span>{title}</span>
                                </li>
                              </Link>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                ) : (
                  <li
                    className="nav-item d-block d-lg-none"
                    onClick={() => {
                      setShowLoginModal(true);
                    }}
                  >
                    <div className="shopTDLi">
                      <a className="nav-link">
                        {/* <i class="fa-regular fa-circle-user"></i> */}
                        Login
                      </a>
                    </div>
                  </li>
                )}
                {/*end responsive profile icon end */}
              </ul>
            </div>
          </nav>
        </div>
      </section>
      {/*  */}
      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setShowSignUpModal={setShowSignUpModal}
        />
      )}

      {showSignUpModal && (
        <CreateAccountModal
          setShowSignUpModal={setShowSignUpModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </>
  );
};

export default Navbar;
