import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/Login.css"; // Reusing the same styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    alert("Password reset link has been sent to your email.");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <form onSubmit={handleForgotPassword} className="login-form">
        <h2>Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email to receive a password reset link.
        </p>
        <input
          type="email"
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Send Reset Link
        </button>

        {/* Back to Login Link */}
        <p
          className="forgot-password text-center mt-3"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
