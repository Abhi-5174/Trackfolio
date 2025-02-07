import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../src/styles/Login.css"; // Import the CSS file
import { useAuth } from "../context/AuthProvider";
import "../../src/styles/Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard");
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/login`, {
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
            className="forgot-password"
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
      </form>
    </div>
  );
};

export default Login;