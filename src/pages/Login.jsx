import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
const AUTH_API = import.meta.env.VITE_AUTH_API;

const Login = () => {
  const { user, fetchUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${AUTH_API}/login`, formData, {
        withCredentials: true,
      });
      await fetchUser();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-sm shadow">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-800 text-white py-2 px-4 rounded-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              <Link to="#" className="hover:underline">
                Forgot your password?
              </Link>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-800 font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
