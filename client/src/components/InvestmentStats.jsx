import React, { useState, useEffect } from "react";

const StatItem = ({ endValue, text, color, format }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; 
    const increment = Math.ceil(endValue / (duration / 20));

    const counter = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 20);

    return () => clearInterval(counter);
  }, [endValue]);

  const statItemStyle = {
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    width: "250px",
    margin: "10px",
  };

  const statUnderlineStyle = {
    height: "4px",
    width: "50px",
    margin: "10px auto 0",
    backgroundColor: color,
  };

  return (
    <div className="stat-item" data-aos="flip-left" style={statItemStyle}>
      <h2>
        {count}
        {format}
      </h2>
      <p>{text}</p>
      <div className={`stat-underline ${color}`} style={statUnderlineStyle}></div>
    </div>
  );
};

const InvestmentStats = () => {
  const sectionStyle = {
    display: "flex",
    justifyContent: "space-around",
    padding: "50px 0",
    overflowX: "hidden",
    flexWrap: "wrap",
  };

  const mobileSectionStyle = {
    ...sectionStyle,
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 10px",
  };

  return (
    <section
      className="investment-stats"
      data-aos="fade-up"
      style={window.innerWidth <= 480 ? mobileSectionStyle : sectionStyle}
    >
      <StatItem
        endValue={400}
        text="Investors trust Sharesight"
        color="yellow"
        format="k+"
      />
      <StatItem
        endValue={700}
        text="Stocks, ETFs & funds supported"
        color="blue"
        format="k+"
      />
      <StatItem
        endValue={200}
        text="Software, broker & partner integrations"
        color="orange"
        format=""
      />
    </section>
  );
};

export default InvestmentStats;