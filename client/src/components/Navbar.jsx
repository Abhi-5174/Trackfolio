import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css"; // Import the updated CSS file
import Logo from "../../src/assets/png/Logo.png"; // Import your logo

const Navbar = () => {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to navigate to home when clicking the logo or name
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo and App Name (Clickable) */}
      <div className="brand-logo" onClick={handleLogoClick}>
        <h1 className="brand-name">Trackfolio</h1>
        <img src={Logo} alt="Trackfolio Logo" className="nav-logo" />
      </div>

      <div className="nav-links">
        {/* <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          Home
        </Link> */}
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active-link" : ""}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={location.pathname === "/signup" ? "active-link" : ""}
        >
          Sign Up
        </Link>
        {/* <Link
          to="/dashboard"
          className={`dashboard-btn ${
            location.pathname === "/dashboard" ? "active-link" : ""
          }`}
        >
          Dashboard
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
