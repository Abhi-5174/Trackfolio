import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // Import API URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async (token) => {
    try {
      await axios.post(`${API_BASE_URL}/auth-verify`, {
        token,
      });

      setIsAuthenticated(true);
      return;
    } catch (error) {
      setIsAuthenticated(false);
      return;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    verifyToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
