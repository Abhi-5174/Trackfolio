// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/Signup.css"; // Import the CSS file with separate styles

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up with:", email, password);
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">
      {" "}
      {/* Wrapper for centering the form */}
      <form onSubmit={handleSignup} className="signup-form">
        {" "}
        {/* Main form wrapper */}
        <h2>Sign Up</h2>
        <input
          type="email"
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
      </form>
    </div>
  );
};

export default Signup;
