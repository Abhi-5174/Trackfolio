import React, { useEffect } from "react";
import "../../src/styles/Home.css"; // Import the CSS for this page
import AOS from "aos"; // Import the AOS library for scroll animations
import "aos/dist/aos.css"; // Import the AOS CSS
import InvestmentStats from "../components/InvestmentStats";

const Home = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS for scroll animations
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-in">
        <div className="hero-content">
          <h1>Smart Investment Portfolio Tracker</h1>
          <p>
            Stay ahead in your financial journey! Monitor your assets, analyze
            market trends, and optimize your investments with real-time
            insights.
          </p>
          <ul className="hero-features">
            <li>📈 Real-time Market Updates</li>
            <li>💰 Automated Portfolio Management</li>
            <li>🔍 AI-Driven Investment Insights</li>
            <li>📊 Track Stocks, Crypto, & Mutual Funds</li>
          </ul>
          <a href="/signup" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </section>

      {/* Animated Images Section */}
      {/* Animated Images Section with Information */}
      {/* Animated Images Section with Information */}
      <section className="animated-images" data-aos="fade-up">
        <h2 className="section-heading">
          Explore Market Trends & Investment Insights
        </h2>
        <div className="image-card" data-aos="zoom-in">
          <img
            src="https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.jpg?s=2048x2048&w=is&k=20&c=9hGnhvZOSnLVB-o5XY9VxK7Q4TB3H3VC9i3y7_El7-U="
            alt="Investment Growth"
          />
          <div className="image-info">
            <h3>Investment Growth</h3>
            <p>
              Analyze and track your portfolio performance with real-time
              insights.
            </p>
          </div>
        </div>

        <div className="image-card" data-aos="zoom-in">
          <img
            src="https://media.istockphoto.com/id/1465618017/photo/businessmen-investor-think-before-buying-stock-market-investment-using-smartphone-to-analyze.webp?s=2048x2048&w=is&k=20&c=ocYlO-ILbQNIpV70O32Ja3P4kMLi9_Yj-78Xrf-Y6L8="
            alt="Crypto Analysis"
          />
          <div className="image-info">
            <h3>Crypto Market Trends</h3>
            <p>
              Stay updated with the latest cryptocurrency trends and price
              movements.
            </p>
          </div>
        </div>

        <div className="image-card" data-aos="zoom-in">
          <img
            src="https://cdn.pixabay.com/photo/2021/05/27/10/28/stock-market-6287711_640.jpg"
            alt="Stock Market"
          />
          <div className="image-info">
            <h3>Stock Market Insights</h3>
            <p>
              Understand stock market trends with in-depth analysis and expert
              opinions.
            </p>
          </div>
        </div>

        <div className="image-card" data-aos="zoom-in">
          <img
            src="https://cdn.pixabay.com/photo/2024/06/18/03/40/finance-8836902_640.jpg"
            alt="Financial Planning"
          />
          <div className="image-info">
            <h3>Financial Planning</h3>
            <p>
              Plan your investments wisely to achieve financial freedom and
              stability.
            </p>
          </div>
        </div>
      </section>

      {/* New Statistics Section (Inspired by the Image) */}

      <InvestmentStats />
      {/* <section className="investment-stats" data-aos="fade-up">
        <div className="stat-item" data-aos="flip-left">
          <h2>
            400<span>k+</span>
          </h2>
          <p>Investors trust Sharesight</p>
          <div className="stat-underline yellow"></div>
        </div>
        <div className="stat-item" data-aos="flip-left">
          <h2>
            700<span>k+</span>
          </h2>
          <p>Stocks, ETFs & funds supported</p>
          <div className="stat-underline blue"></div>
        </div>
        <div className="stat-item" data-aos="flip-left">
          <h2>200</h2>
          <p>Software, broker & partner integrations</p>
          <div className="stat-underline orange"></div>
        </div>
      </section> */}

      {/* Pricing & Plans Section */}
      <section className="pricing-section" data-aos="fade-up">
        <h2 className="pricing-title">Choose Your Plan</h2>
        <p className="pricing-subtitle">
          Start by tracking up to 10 holdings for <strong>free</strong>! Upgrade
          anytime to access advanced features.
        </p>

        <div className="pricing-cards">
          {/* Free Plan */}
          <div className="pricing-card">
            <h3>Free</h3>
            <p className="price">
              $0 <span>Forever</span>
            </p>
            <ul>
              <li>1 Portfolio</li>
              <li>10 Holdings</li>
              <li>1 Custom Group</li>
              <li>Limited Reporting</li>
              <li>Basic Support</li>
            </ul>
            <a href="/signup" className="btn btn-outline">
              Get started →
            </a>
          </div>

          {/* Starter Plan */}
          <div className="pricing-card starter">
            <h3>Starter</h3>
            <p className="price">
              $7 <span>USD per month</span>
            </p>
            <p className="billing-cycle">$9.33 USD billed monthly</p>
            <ul>
              <li>1 Portfolio</li>
              <li>30 Holdings</li>
              <li>3 Custom Groups</li>
              <li>Limited Reporting</li>
              <li>Standard Support</li>
            </ul>
            <a href="/signup" className="btn btn-primary">
              Get started →
            </a>
          </div>

          {/* Investor Plan */}
          <div className="pricing-card investor">
            <h3>Investor</h3>
            <p className="price">
              $18 <span>USD per month</span>
            </p>
            <p className="billing-cycle">$24 USD billed monthly</p>
            <ul>
              <li>4 Portfolios</li>
              <li>Unlimited Holdings</li>
              <li>5 Custom Groups</li>
              <li>Advanced Reporting</li>
              <li>Standard Support</li>
            </ul>
            <a href="/signup" className="btn btn-primary">
              Get started →
            </a>
          </div>

          {/* Expert Plan */}
          <div className="pricing-card expert">
            <h3>Expert</h3>
            <p className="price">
              $23.25 <span>USD per month</span>
            </p>
            <p className="billing-cycle">$31 USD billed monthly</p>
            <ul>
              <li>10 Portfolios</li>
              <li>Unlimited Holdings</li>
              <li>10 Custom Groups</li>
              <li>Full Reporting</li>
              <li>Priority Support</li>
            </ul>
            <a href="/signup" className="btn btn-outline">
              Get started →
            </a>
          </div>
        </div>
      </section>

      {/* Link to Dashboard Section */}
      {/* <section className="dashboard-link">
        <a href="/dashboard" className="btn btn-outline">
          Go to Dashboard
        </a>
      </section> */}
    </div>
  );
};

export default Home;
