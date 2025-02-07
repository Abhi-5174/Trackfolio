import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    if (!token) {
      // console.log("No token found, redirecting to login");
      setIsAuthenticated(false);
      navigate("/");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/auth-verify`, {
        token,
      });
      // console.log("Token verified, redirecting to dashboard");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      // console.log("Token verification failed, redirecting to login", error);
      setIsAuthenticated(false);
      navigate("/");
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