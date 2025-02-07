import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/Login.css"; // Reusing the same styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Password reset link has been sent to your email.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleForgotPassword} className="login-form">
        <h2>Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email to receive a password reset link.
        </p>

        {error && <p className="text-red-500">{error}</p>}

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
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
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
