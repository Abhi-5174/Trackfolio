import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userProfile.css";
import logo from "../assets/userLogo.webp";

const UserDropdown = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Extract initials from userName

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {/* Avatar Button */}
      <button className="avatar" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={logo} // Default placeholder logo
          alt="User Logo"
          className="user-logo-img"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleSignOut}>
            <span className="sign-out-icon">↩️</span> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
