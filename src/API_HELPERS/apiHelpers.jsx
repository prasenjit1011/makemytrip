import http from "../utils/HttpClient";
const API_ENDPOINT = "v1/user/";

export const getAllSlots = (data) => {
  const endpoint = API_ENDPOINT + "view-all-slottime";
  return http.requestData(endpoint, data, "POST");
};
export const checkAvailability = (data) => {
  const endpoint = API_ENDPOINT + "check-availability";
  return http.requestData(endpoint, data, "POST");
};
export const addCartData = (data) => {
  const endpoint = API_ENDPOINT + "add-cart";
  return http.requestData(endpoint, data, "POST");
};
export const getCartData = () => {
  const endpoint = API_ENDPOINT + "get-cart";
  return http.requestData(endpoint);
};
export const deleteCartItem = (id) => {
  const endpoint = API_ENDPOINT + `delete-cart/${id}`;
  return http.requestData(endpoint, {}, "DELETE");
};
export const deleteGiftCartItem = (id) => {
  const endpoint = API_ENDPOINT + `delete-gift-card/${id}`;
  return http.requestData(endpoint, {}, "DELETE");
};

export const getUserWishlistFolders = () => {
  const endpoint = API_ENDPOINT + "view-folder";
  return http.requestData(endpoint);
};
export const getUserWishList = (id) => {
  const endpoint = API_ENDPOINT + `view-folder-Wishlist/${id}`;
  return http.requestData(endpoint);
};
export const createWishlistFolder = (data) => {
  const endpoint = API_ENDPOINT + `add-folder`;
  return http.requestData(endpoint, data, "POST");
};
export const deleteWishlistFolder = (id) => {
  const endpoint = API_ENDPOINT + `delete-folder/${id}`;
  return http.requestData(endpoint, {}, "DELETE");
};

export const addToWishlist = (data) => {
  const endpoint = API_ENDPOINT + `add-To-Wishlist`;
  return http.requestData(endpoint, data, "POST");
};
export const makePayment = (data) => {
  const endpoint = API_ENDPOINT + "createBooking";
  return http.requestData(endpoint, data, "POST");
};
export const getAllBookings = () => {
  const endpoint = API_ENDPOINT + "view-all-booking";
  return http.requestData(endpoint, {}, "GET");
};
export const getUpcomingBookings = () => {
  const endpoint = API_ENDPOINT + "view-upcoming-booking";
  return http.requestData(endpoint, {}, "GET");
};
export const getCompletedBookings = () => {
  const endpoint = API_ENDPOINT + "view-previous-booking";
  return http.requestData(endpoint, {}, "GET");
};
export const viewBookingTicket = (id, id2) => {
  const endpoint = API_ENDPOINT + `view-booking-ticket/${id}/${id2}`;
  return http.requestData(endpoint, {}, "GET");
};

export const getAllTopCountries = () => {
  const endpoint = API_ENDPOINT + "viewCountry";
  return http.requestData(endpoint, {}, "GET");
};
export const getTopCities = () => {
  const endpoint = API_ENDPOINT + "get-destinations";
  return http.requestData(endpoint, {}, "GET");
};
export const getAllActivitySites = () => {
  const endpoint = API_ENDPOINT + "all-activity-site";
  return http.requestData(endpoint, {}, "GET");
};
export const getAllDestinationsForFilter = () => {
  const endpoint = API_ENDPOINT + "view-all-destination";
  return http.requestData(endpoint, {}, "GET");
};
export const getAllCategoriesForFilter = () => {
  const endpoint = API_ENDPOINT + "view-all-category";
  return http.requestData(endpoint, {}, "GET");
};
export const getAllLanguagesForFilter = () => {
  const endpoint = API_ENDPOINT + "viewAllLanguage";
  return http.requestData(endpoint, {}, "GET");
};
export const filterSiteActivities = (activitySiteId, activityTypeId, data) => {
  const endpoint =
    API_ENDPOINT +
    `filter-sitesAgainstActivity/${activitySiteId}/${activityTypeId}`;
  return http.requestData(endpoint, data, "POST");
};
export const filterCityActivities = (activitySiteId, activityTypeId, data) => {
  const endpoint =
    API_ENDPOINT +
    `filter-cityAgainstActivity/${activitySiteId}/${activityTypeId}`;
  return http.requestData(endpoint, data, "POST");
};

export const getAllBlogTypes = () => {
  const endpoint = API_ENDPOINT + "view-type";
  return http.requestData(endpoint, {}, "GET");
};
export const getAllBlogs = (id) => {
  const endpoint = API_ENDPOINT + `view-blog-category/${id}`;
  return http.requestData(endpoint, {}, "GET");
};
export const getSingleBlogs = (id) => {
  const endpoint = API_ENDPOINT + `/view-single-blog/${id}`;
  return http.requestData(endpoint, {}, "GET");
};
export const checkReviewStatus = (data) => {
  const endpoint = API_ENDPOINT + "checkreview";
  return http.requestData(endpoint, data, "POST");
};
export const editUserReview = (data, id) => {
  const endpoint = API_ENDPOINT + `editReviewRating/${id}`;
  return http.requestData(endpoint, data, "PUT");
};

export const postReview = (data) => {
  const endpoint = API_ENDPOINT + "addReviewRating";
  return http.requestData(endpoint, data, "POST");
};
export const updateProfile = (data) => {
  const endpoint = API_ENDPOINT + "updateProfile";
  return http.requestData(endpoint, data, "PUT");
};
export const changeUserPassword = (data) => {
  const endpoint = API_ENDPOINT + "update-password";
  return http.requestData(endpoint, data, "PUT");
};
export const getAboutUsPageDetails = () => {
  const endpoint = API_ENDPOINT + "about-us";
  return http.requestData(endpoint, {}, "GET");
};
export const getAllActivitiesAgainstType = (id) => {
  const endpoint = API_ENDPOINT + `view-activity-typewisee-with-token/${id}`;
  return http.requestData(endpoint, {}, "GET");
};
export const getLegalNotice = () => {
  const endpoint = API_ENDPOINT + "legal-notice";
  return http.requestData(endpoint, {}, "GET");
};
export const getPrivacyPolicy = () => {
  const endpoint = API_ENDPOINT + "view-privacy-policy";
  return http.requestData(endpoint, {}, "GET");
};
export const getTermsAndConditions = () => {
  const endpoint = API_ENDPOINT + "view-terms-condition";
  return http.requestData(endpoint, {}, "GET");
};
export const getCookies = () => {
  const endpoint = API_ENDPOINT + "view-all-cookies";
  return http.requestData(endpoint, {}, "GET");
};
export const getSitemap = () => {
  const endpoint = API_ENDPOINT + "view-sitemap";
  return http.requestData(endpoint, {}, "GET");
};
export const getInformation = () => {
  const endpoint = API_ENDPOINT + "view-info-digital-service";
  return http.requestData(endpoint, {}, "GET");
};
export const getCitiesAgainstCountry = (countryId) => {
  const endpoint = API_ENDPOINT + `city-against-country/${countryId}`;
  return http.requestData(endpoint, {}, "GET");
};
export const getTypeAgainstSities = async (id) => {
  let endPoint = API_ENDPOINT + `view-activity-sitewise/${id}`;
  return http.requestData(endPoint, {}, "GET");
};
export const getAllTopics = () => {
  const endpoint = API_ENDPOINT + "viewTopic";
  return http.requestData(endpoint, {}, "GET");
};

export const getAllTourModules = (cityId) => {
  const endpoint = API_ENDPOINT + `view-all-tourModule/${cityId}`;
  return http.requestData(endpoint, {}, "GET");
};

export const getAllActivitiesAgainstCityAndTourModule = (
  servicetypeId,
  cityId,
  tourModuleId,
  body
) => {
  console.log(
    "s" + servicetypeId + "c" + cityId + "tourModule" + tourModuleId,
    "kkk"
  );

  if (!servicetypeId || !cityId || !tourModuleId) {
    return;
  }

  console.log("baler service Id", servicetypeId);
  const endpoint =
    API_ENDPOINT +
    `cityAgainstAcityvity/${cityId}/${tourModuleId}/${servicetypeId}`;
  return http.requestData(endpoint, body, "POST");
};
export const getAllActivitiesAgainstCityAndTourModuleAndactivityType = (
  cityId,
  tourModuleId,
  body
) => {
  const endpoint =
    API_ENDPOINT + `cityAgainstAcityvity/${cityId}/${tourModuleId}`;
  return http.requestData(endpoint, body, "POST");
};

export const getPopularActivitiesAgainstCity = (cityId) => {
  const endpoint = API_ENDPOINT + `popular-activity/${cityId}`;
  return http.requestData(endpoint, {}, "GET");
};
export const getPastWishlistActivities = () => {
  const endpoint = API_ENDPOINT + "past-wishlist";
  return http.requestData(endpoint, {}, "GET");
};
export const getSearchedQuestions = (searchKey) => {
  const endpoint = API_ENDPOINT + `search-contact-question/${searchKey}`;
  return http.requestData(endpoint, {}, "GET");
};
export const getAllGiftCards = () => {
  const endpoint = API_ENDPOINT + "view-gift-card";
  return http.requestData(endpoint, {}, "GET");
};
export const sendGiftCard = (data) => {
  const endpoint = API_ENDPOINT + "send-gift-card";
  return http.requestData(endpoint, data, "POST");
};
export const deleteBooking = (id) => {
  const endpoint = API_ENDPOINT + `deleteBooking/${id}`;
  return http.requestData(endpoint, {}, "PUT");
};

export const getCalenderWise = (data) => {
  // console.log("nfhghk", new Date().getTime());
  const endpoint = API_ENDPOINT + "calender-monthwise-availability";
  return http.requestData(endpoint, data, "POST");
};

export const contactAdmin = (data) => {
  const endpoint = API_ENDPOINT + "contactus-issue";
  return http.requestData(endpoint, data, "POST");
};
export const createMerchant = (data) => {
  const endpoint = API_ENDPOINT + "create-marchants";
  return http.requestData(endpoint, data, "POST");
};

export const giftCardQuestion = () => {
  const endpoint = API_ENDPOINT + "user-view-gift-question";
  return http.requestData(endpoint, "GET");
};
export async function MyGiftcouponApi() {
  let endPoint = API_ENDPOINT + `get-received-giftcart`;
  return http.requestData(endPoint, "GET");
}

export const TopCityCartActivity = (data) => {
  const datas = {
    activityDatailsID: data ? data : "",
  };

  const endpoint = API_ENDPOINT + "view-activity-wise-city-data";
  return http.requestData(endpoint, datas, "POST");
};

export const AllPress = () => {
  const endpoint = API_ENDPOINT + "user-view-press";
  return http.requestData(endpoint, "GET");
};
