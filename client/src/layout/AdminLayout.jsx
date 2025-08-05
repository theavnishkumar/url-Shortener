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
  if(user.role !== "admin") return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl text-gray-400 mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
        <button 
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
  return (
    <>
    <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};
