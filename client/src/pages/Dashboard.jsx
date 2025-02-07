// src/pages/Dashboard.jsx
import React, { useState } from "react";
import "../../src/styles/Dashboard.css";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stockData = [
  { name: "Jan", value: 8000 },
  { name: "Feb", value: 9000 },
  { name: "Mar", value: 10000 },
  { name: "Apr", value: 11000 },
  { name: "May", value: 12000 },
];

const pieData = [
  { name: "Stocks", value: 10000 },
  { name: "Crypto", value: 7500 },
  { name: "Bonds", value: 5000 },
];

const COLORS = ["#4f83cc", "#ff7f50", "#34c38f"];

const transactionsData = [
  { id: 1, type: "Stock", amount: "+$500", date: "Feb 2", status: "profit" },
  { id: 2, type: "Crypto", amount: "-$200", date: "Feb 3", status: "loss" },
  { id: 3, type: "Bonds", amount: "+$300", date: "Feb 4", status: "profit" },
  { id: 4, type: "Stock", amount: "-$100", date: "Feb 5", status: "loss" },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Filtered Transactions Logic
  const filteredTransactions = transactionsData.filter((tx) => {
    const matchesSearch = tx.type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || tx.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard">
      <h2>Your Investment Portfolio</h2>

      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div className="summary-card">
          <h4>Total Portfolio</h4>
          <p>$22,500</p>
        </div>
        <div className="summary-card">
          <h4>Growth Rate</h4>
          <p className="positive">+12.5%</p>
        </div>
      </div>

      {/* Stock Line Chart */}
      <div className="chart-container">
        <h3>Stock Performance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={stockData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f83cc"
              strokeWidth={2}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Asset Distribution */}
      <div className="pie-chart">
        <h3>Asset Allocation</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Search & Filter Transactions */}
      <div className="transactions">
        <h3>Recent Transactions</h3>

        <div className="transaction-controls">
          <input
            type="text"
            placeholder="Search by type (Stock, Crypto, Bonds)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Transactions</option>
            <option value="profit">Profits Only</option>
            <option value="loss">Losses Only</option>
          </select>
        </div>

        <ul>
          {filteredTransactions.map((tx) => (
            <li key={tx.id} className={`transaction-item ${tx.status}`}>
              <span className="tx-type">{tx.type}</span>
              <span className="tx-amount">{tx.amount}</span>
              <span className="tx-date">{tx.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
