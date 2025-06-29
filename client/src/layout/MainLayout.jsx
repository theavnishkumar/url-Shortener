import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import ScrollToTop from "../utils/ScrollToTop";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading || !user) return <LoadingSpinner />;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
