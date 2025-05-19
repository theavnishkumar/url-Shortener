import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return <>Loading...</>;

  if (!user) return null; // Return nothing until redirect happens

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
