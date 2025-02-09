import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../src/styles/Login.css";
import { useAuth } from "../context/AuthProvider";
import Logo from "../../src/assets/png/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || `http://localhost:5000`; // Import API URL

  if (isAuthenticated) {
    navigate("/dashboard");
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      const { data: { token = "", message } = {} } = response || {};

      localStorage.setItem("accessToken", token);
      toast.success(message);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const { response: { data: { message } = {} } = {} } = error || {};
      toast.error(message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <img src={Logo} alt="logo" style={{ height: "80px", textAlign: "center" }} />
        <h1>Welcome</h1>
        <h2>Login to your Trackfolio account</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Forgot Password Link Positioned Correctly */}
        <div className="forgot-password-container">
          <p
            className="forgot-password text-blue-600 py-2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Login
        </button>
        <p style={{ marginTop: "20px", marginBottom: "10px" }}>Don't have an account? <span className="cursor-pointer text-blue-800" onClick={() => navigate("/signup")}>Sign Up</span></p>
      </form>
    </div>
  );
};

export default Login;
