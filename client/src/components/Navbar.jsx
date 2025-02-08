import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css"; // Import the updated CSS file
import Logo from "../../src/assets/png/Logo.png"; // Import your logo
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Hook for programmatic navigation

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="brand-logo" onClick={handleLogoClick}>
        {/* <h1 className="brand-name">Trackfolio</h1> */}
        <img src={Logo} alt="Trackfolio Logo" className="nav-logo" />
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {isAuthenticated ? (
          <button
            className="sign-out-btn"
            onClick={() => {
              localStorage.removeItem("accessToken");
              setIsAuthenticated(false);
              navigate("/");
            }}
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
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