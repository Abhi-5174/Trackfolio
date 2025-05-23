// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../src/assets/png/Logo.png";
import axios from "axios";
import "../../src/styles/Signup.css"; // Import the CSS file with separate styles
import { useAuth } from "../context/AuthProvider";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Import API URL

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        email,
        password,
      });
      const { data: { message } = {} } = response || {};

      toast.success(message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      const { response: { data: { message } = {} } = {} } = error || {};
      toast.error(message);
    }
  };

  return (
    <div className="signup-page">
      {" "}
      {/* Wrapper for centering the form */}
      <form onSubmit={handleSignup} className="signup-form">
        <img src={Logo} alt="logo" style={{ height: "90px", textAlign: "center" }} />
        {/* Main form wrapper */}
        <h2>Sign Up</h2>
        <label style={{ fontSize: "17px", fontWeight: "500" }}>Email</label>
        <input
          type="email"
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={{ fontSize: "17px", fontWeight: "500" }}>Password</label>
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Sign Up
        </button>
        <p className="login-redirect py-2">
          Already have an account? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
