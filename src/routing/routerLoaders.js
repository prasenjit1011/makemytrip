import HomeService from '../Service/HomeService';
import HttpClient from '../utils/HttpClient';

async function Homeloader({ request }) {
  console.log('request', request);
  const url = new URL(request.url);

  let lan = url.searchParams.get('lan');
  let currentTab = url.searchParams.get('currentTab');

  if (lan === null) {
    lan = 'eng';
  }
  if (currentTab === null) {
    let res = await HttpClient.requestData('v1/user/viewActivityType');
    if (res && res.status) {
      // return res.data;
      currentTab = res.data?.[0]?._id;
    }
  }

  // url.searchParams.delete("lan")
  url.searchParams.set('lan', lan);
  url.searchParams.set('currentTab', currentTab);
  window.history.pushState({}, '', url.href);

  return null;
}

export default {
  Homeloader,
};
