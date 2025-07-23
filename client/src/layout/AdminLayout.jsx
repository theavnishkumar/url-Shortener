import {Outlet, useNavigate} from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../utils/ScrollToTop";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading || !user) return <LoadingSpinner />;
  if(user.role!=="admin") return <>Only admin allowed</>
  return (
    <>
    <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};
