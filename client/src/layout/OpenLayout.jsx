import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import ScrollToTop from "../utils/ScrollToTop";
import { LoadingSpinner } from "../components/LoadingSpinner";

const OpenLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default OpenLayout;
