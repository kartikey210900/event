import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_URL || "https://event-n0mx.onrender.com";

  const login = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      username,
      password,
    });
    setUser({ token: response.data.token, role: response.data.role });
    localStorage.setItem("token", response.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
