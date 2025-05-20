import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const USER_API = import.meta.env.VITE_USER_API;
const AUTH_API = import.meta.env.VITE_AUTH_API;

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const fetchUser = () => {
    axios
      .get(`${USER_API}`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    axios
      .post(`${AUTH_API}/logout`, {}, { withCredentials: true })
      .then(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
