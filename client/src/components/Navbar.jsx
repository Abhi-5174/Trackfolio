import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./auth"; // Adjust the import path as necessary
import Logo from "../../src/assets/png/Logo.png"; // Adjust the import path as necessary
import { FaBars, FaTimes } from "react-icons/fa"; // Adjust the import path as necessary

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken"); // Clear token from storage
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page after sign out
  };

  return (
    <nav className="navbar">
      <div className="brand-logo" onClick={handleLogoClick}>
        <h1 className="brand-name">Trackfolio</h1>
        <img src={Logo} alt="Trackfolio Logo" className="nav-logo" />
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active-link" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={location.pathname === "/signup" ? "active-link" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
