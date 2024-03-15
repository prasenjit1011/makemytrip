import React from 'react';
import {
  createBrowserRouter,
  Routes,
  Route,
  Navigate,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Mainpagelayout from '../Layout/MainLayout';
import Home from '../view/Home/Home';
import Activities from '../view/Activities/Activities';
import ActivitiesCity from '../view/ActivityParis/ActivitiesCity';
import AddToCart from '../view/AddToCart/Index';
import CulturalExperienceDetails from '../view/CulturalExperienceDetails/Index';
import Wishlist from '../view/Wishlist/Index';
import Booking from '../view/Booking/Index';
import Additions from '../view/Additions/Index';
import MakePayment from '../view/MakePayment/Index';
import BookingHistory from '../view/BookingHistory/Index';
import History from '../view/History/Index';
import Contact from '../view/Contact/Index';
import routerLoaders from './routerLoaders';
import HomeContext from '../Context/HomeContext';
import About from '../../src/view/AboutUs/Index';
import Career from '../../src/view/Career/Index';
import Terms from '../../src/view/TermsCondition/Index';
import Legal from '../../src/view/Legal/Index';
import Press from '../../src/view/Press/Index';
import Blog from '../../src/view/Blog/Index';
import PrivacyPolicy from '../view/PrivacyPolicy/PrivacyPolicy';
import SiteMap from '../view/SiteMap/Index';
import Information from '../view/Information/Index';
import Cookies from '../view/Cookies/Index';
import Magazine from '../../src/view/Magazine/index';
import TravelGuides from '../../src/view/TravelGuides/index';
import HowTravel from '../../src/view/HowTravel/index';
import CheckRoutes, { activityTypesLoader } from './CheckRoutes';
import SearchPage from '../view/SearchPage/Search';
import Settings from '../view/Settings/Setting';
import SearchSites from '../view/SearchPage/SearchSites';
import Gift from '../view/GiftcardPage/Gift';
import SendGift from '../view/GiftcardPage/SendGift';
import BlogDetail from '../view/Blogdetails/BlogDetail';
import ActivityProvider from "../view/Activities/ActivityProvider";
import MerchantSupplierForm from '../components/Merchant/MerchantSupplierForm';
import GiftCoupon from '../view/GiftcardPage/GiftCoupon';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Mainpagelayout />}>
      <Route
        path="/"
        element={
          <HomeContext>
            <Home />
          </HomeContext>
        }
        loader={routerLoaders.Homeloader}
      ></Route>
      <Route element={<CheckRoutes />} loader={activityTypesLoader}>
        {/* <Route path="/booking" element={<Booking />} /> */}
        <Route path="/additions" element={<Additions />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/send-gift/:id" element={<SendGift />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/add-to-cart" element={<AddToCart />} />
      <Route path="/sites/:type/:id" element={<Activities />}></Route>
      <Route path="/city/:id" element={<ActivitiesCity />}></Route>
      <Route path="/activity/:id/:slug" element={<CulturalExperienceDetails />} />

      <Route path="/browsing-history" element={<History />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/career" element={<Career />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/press" element={<Press />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/sitemap" element={<SiteMap />} />
      <Route path="/information" element={<Information />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/magazine" element={<Magazine />} />
      <Route path="/travelguides" element={<TravelGuides />} />
      <Route path="/howtravel" element={<HowTravel />} />
      <Route path="/activityProvider/:id" element={<ActivityProvider />} />
      <Route path="/search-cities/:id/:city" element={<SearchPage />} />
      <Route path="/search-sites/:id/:city" element={<SearchSites />} />
      <Route path="/search-countries/:id/:city" element={<SearchSites />} />
      <Route path="/gift" element={<Gift />} />
      <Route path="/blogdetail/:id/:catName" element={<BlogDetail />} />
      <Route path='/merchantsupplierfrom' element={<MerchantSupplierForm />} />
      <Route path='/myGiftcoupon' element={<GiftCoupon />} />
      <Route path="/pressDetails" element={<BlogDetail />} />
      {/* <Route path="*" element={<Home />} /> */}



      {/* <Route path="/test" element={<Test />}></Route> */}
    </Route>
  )
);

export default router;
