import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css"; 
import Logo from "../../src/assets/png/Logo.png"; 
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
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
        <h1 className="brand-name">Trackfolio</h1>
        <img src={Logo} alt="Trackfolio Logo" className="nav-logo" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

 
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
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
        {/* <Link
          to="/dashboard"
          className={`dashboard-btn ${location.pathname === "/dashboard" ? "active-link" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
