import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "../../src/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Sections */}
        <div className="footer-sections">
          <div className="footer-column">
            <h3>Portfolio Tracker</h3>
            <ul>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Features
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Sign Up
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Import
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  About
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Download App</h3>
            <div className="app-buttons">
              <img
                src="https://www.mprofit.in/static/app-store-badge-new-bbeb699524c428d26ca4e2cd3929cd46.png"
                alt="App Store"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 Portfolio Tracker Private Limited</p>
        <div className="social-icons">
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
