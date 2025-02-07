import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    try {
      await axios.post(`http://localhost:5000/auth-verify`, {
        token,
      });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      setIsAuthenticated(false);
      navigate("/login");
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
