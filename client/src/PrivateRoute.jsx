import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log({ isAuthenticated });
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
