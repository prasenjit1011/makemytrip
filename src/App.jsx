import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '../src/view/CulturalExperienceDetails/CulturalExperience.css';
import './view/Wishlist/WishlistStyle.css';
import './view/Booking/Booking.css';
import './view/Additions/Additions.css';
import './view/MakePayment/MakePayment.css';
import './view/BookingHistory/BookingHistory.css';
import './view/Contact/Contact.css';
import './App.css';
import './view/PrivacyPolicy/privacyPolicy.css';
import './view/SiteMap/siteMap.css';
import './view/Information/information.css';
import './view/Cookies/cookies.css';
import './view/Magazine/magazine.css';
import './view/TravelGuides/travelGuides.css';
import './view/HowTravel/howTravel.css';
import router from './routing/routers';
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
