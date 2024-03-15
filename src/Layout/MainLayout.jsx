import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useAuth } from "../Context/AuthContextProvider";
import MainLoader from "../components/Loaders/MainLoader";
import HeaderFilter from "../components/HeaderFilter";

function MainLayout() {
  const { isChecking } = useAuth();

  return (
    <>
      <MainLoader isLoading={isChecking} />
      <Navbar />
      {/* <HeaderFilter /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
