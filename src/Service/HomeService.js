import HttpClient from '../utils/HttpClient';

async function banner(id) {
  let endPoint = `v1/user/viewBanner/${id}`;
  return HttpClient.get(endPoint);
}
async function countries() {
  let endPoint = '';
  return HttpClient.get(endPoint);
}
async function languages() {
  let endPoint = 'v1/user/viewAllLanguage';
  return HttpClient.get(endPoint);
}

async function activityType() {
  let endPoint = 'v1/user/viewActivityType';
  return HttpClient.get(endPoint);
}

async function section(id) {
  let endPoint = `v1/user/viewActivityDetails/${id}`;
  return HttpClient.get(endPoint);
}

async function homePageSearch(data) {
  let endPoint = `v1/user/home-page-search`;
  return HttpClient.post(endPoint, data);
}
async function homePageSearchWithToken(data) {
  let endPoint = `v1/user/home-page-search-token`;
  return HttpClient.post(endPoint, data);
}

async function searchList(data) {
  let endPoint = `v1/user/search-list`;
  return HttpClient.post(endPoint, data);
}

async function searchWithDate(data) {
  let endPoint = `v1/user/home-page-search-with-date`;
  return HttpClient.post(endPoint, data);
}

async function getAllCurrency() {
  let endPoint = `v1/user/view-all-currency`;
  return HttpClient.get(endPoint);
}

async function getAllGiftValue() {
  let endPoint = `v1/user/view-gift`;
  return HttpClient.get(endPoint);
}

// async function createMerchant(data) {
//   let endPoint = `v1/user/create-marchants`;
//   return HttpClient.post(endPoint, data);
// }



export default {
  banner,
  languages,
  activityType,
  section,
  homePageSearch,
  homePageSearchWithToken,
  searchList,
  searchWithDate,
  getAllCurrency,
  getAllGiftValue,
  // createMerchant
};
