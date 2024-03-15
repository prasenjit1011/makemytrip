import HttpClient from '../utils/HttpClient';

async function cityAgainstActivity(type, city) {
  let endPoint = `v1/user/cityAgainstAcityvity/${city}`;
  return HttpClient.get(endPoint);
}

async function siteAgainstActivity(type, site) {
  let endPoint = `v1/user/sitesAgainstActivity/${site}/${type}`;
  return HttpClient.post(endPoint);
}

async function cityDetail(id) {
  let endPoint = `v1/user/viewSingleCity/${id}`;
  return HttpClient.get(endPoint);
}

async function siteDetail(id) {
  let endPoint = `v1/user/viewSingleActivitySite/${id}`;
  return HttpClient.get(endPoint);
}

async function getActivityDetail(id, slug,page) {
  let endPoint = `v1/user/singleActivityDetails/${id}/${slug}/${page}`;
  return HttpClient.get(endPoint);
}
async function getSingleActivityDetail(id, slug,page) {
  let endPoint = `v1/user/single-activity-details/${id}/${slug}/${page}`;
  return HttpClient.get(endPoint);
}

async function getTypeAgainstActivities(id) {
  let endPoint = `v1/user/view-activity-typewisee/${id}`;
  return HttpClient.get(endPoint);
}
async function getTypeAgainstSities(id) {
  let endPoint = `v1/user/view-activity-sitewise/${id}`;
  return HttpClient.get(endPoint);
}
async function getTypeAgainstCities(id) {
  let endPoint = `v1/user/view-activity-citywise/${id}`;
  return HttpClient.get(endPoint);
}

async function addGiftCard(data) {
  let endPoint = `v1/user/add-gift-card`;
  return HttpClient.post(endPoint, data);
}

async function addCouponCard(data) {
  let endPoint = `v1/user/add-card-to-cart`;
  return HttpClient.put(endPoint, data);
}

async function viewParchasedGiftCard(id) {
  let endPoint = `v1/user/view-purchased-giftcard/${id}`;
  return HttpClient.get(endPoint);
}

async function sendActivityGiftCard(data) {
  let endPoint = `v1/user/send-activity-gift-card`;
  return HttpClient.post(endPoint, data);
}

async function sendGiftCard(data) {
  let endPoint = `v1/user/send-gift-card`;
  return HttpClient.post(endPoint, data);
}

async function addReviewRating(data) {
  let endPoint = `v1/user/addReviewRating`;
  return HttpClient.post(endPoint, data);
}
async function marchantdata(id) {
  let endPoint = `v1/user/get-single-marchent/${id}`;
  return HttpClient.get(endPoint);
}

// async function MyGiftcouponApi() {
//   let endPoint = `v1/user/get-received-giftcart`;
//   return HttpClient.get(endPoint);
// }




export default {
  // MyGiftcouponApi,
  cityAgainstActivity,
  cityDetail,
  siteDetail,
  siteAgainstActivity,
  getActivityDetail,
  getTypeAgainstActivities,
  getTypeAgainstSities,
  getTypeAgainstCities,
  getSingleActivityDetail,
  addGiftCard,
  addCouponCard,
  viewParchasedGiftCard,
  sendActivityGiftCard,
  sendGiftCard,
  addReviewRating,
  marchantdata
};
