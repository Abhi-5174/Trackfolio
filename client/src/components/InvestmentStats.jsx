import React, { useState, useEffect } from "react";
import "../../src/styles/InvestmentStats.css";

const StatItem = ({ endValue, text, color, format }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
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

  return (
    <div className="stat-item" data-aos="flip-left">
      <h2>
        {count}
        {format}
      </h2>
      <p>{text}</p>
      <div className={`stat-underline ${color}`}></div>
    </div>
  );
};

const InvestmentStats = () => {
  return (
    <section className="investment-stats" data-aos="fade-up">
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
