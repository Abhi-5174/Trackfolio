import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../../src/styles/Login.css"; // Reusing the same styles
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // Import API URL

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/reset-password/${token}`,
        { newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Allow time for toast to display
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleResetPassword} className="login-form">
        <h2>Reset Password</h2>
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="border p-2 mb-2 w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
