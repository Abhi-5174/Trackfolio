import React from "react";
import "../styles/about.css";
import { Chatbot } from "../components/chatBot";

const About = () => {
  return (
    <div className="aboutUs">
      <div className="about-container">
        <h1 className="about-title">About Us</h1>

        <div className="about-section">
          <p>
            The Investment Portfolio Tracker is a user-friendly tool designed to help
            investors manage and monitor their assets, including stocks, cryptocurrencies,
            and other investments. Our platform provides real-time data, performance
            analytics, and customizable views, allowing users to make informed decisions
            effortlessly.
          </p>
        </div>

        <div className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li>📊 Real-time Portfolio Overview with interactive charts.</li>
            <li>⚙️ Customizable widgets and asset management.</li>
            <li>🔍 Responsive filtering and search functionalities.</li>
            <li>📈 Performance comparison tool for in-depth analysis.</li>
            <li>🔒 Secure authentication and cloud-based data storage.</li>
            <li>📱 Multi-device accessibility with seamless synchronization.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Use This Tracker?</h2>
          <p>
            Whether you're a beginner investor or an experienced trader, our Investment
            Portfolio Tracker provides an intuitive and efficient way to keep track of
            your investments. Stay informed, analyze trends, and optimize your portfolio
            with ease.
          </p>
        </div>

        <div className="about-section">
          <h2>Future Enhancements</h2>
          <p>
            We are continuously working on improving our platform. Future updates will
            include AI-powered investment recommendations, deeper integration with brokerage
            accounts, and an enhanced mobile experience for on-the-go tracking.
          </p>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default About;
