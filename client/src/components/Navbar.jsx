import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Import the updated CSS file
import Logo from "../../src/assets/png/Logo.png"; // Import your logo
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import UserDropdown from "./UserProfileButton";

const Navbar = () => {
  const location = useLocation(); // Get the current route

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand-logo">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            <img src={Logo} alt="Trackfolio Logo" className="nav-logo" />
          </Link>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {isAuthenticated ? (
            <>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
              <UserDropdown setIsAuthenticated={setIsAuthenticated} />
            </>
          ) : (
            <>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
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
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
