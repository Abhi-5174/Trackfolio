import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/contact";
import About from "./pages/about";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ResetPassword from "./pages/ResetPassword";
import Loading from "./components/Loading";
import { Chatbot } from "./components/chatBot";
import "./index.css";
import { Plus } from "lucide-react";
import InvestmentDashboard from "./components/InvestmentDashboard";
import AddInvestment from "./pages/AddInvestment";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${API_BASE_URL}`;

function Dashboard({
  data,
  loading,
  error,
  selectedTable,
  setSelectedTable,
  handleAddNew,
  onUpdateInvestment,
  onDeleteInvestment,
  onDuplicateInvestment,
}) {
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">No data available</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Investment Portfolio Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="investments">Investments</option>
                <option value="investments_fake">Investments (Fake)</option>
              </select>
              <button
                onClick={handleAddNew}
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                title="Add New Investment"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </div>
        <InvestmentDashboard
          investments={data}
          selectedTable={selectedTable}
          onUpdateInvestment={onUpdateInvestment}
          onDeleteInvestment={onDeleteInvestment}
          onDuplicateInvestment={onDuplicateInvestment}
        />
        <Chatbot />
      </div>
    </div>
  );
}

const App = () => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedTable, setSelectedTable] = useState("investments_fake");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/investments/${selectedTable}`
      ); //
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      fetchData();
    }
  }, [location.pathname, selectedTable]);

  const handleUpdateInvestment = useCallback(
    async (updatedInvestment) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/investments/${selectedTable}/${updatedInvestment._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedInvestment),
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        // Update local state immediately
        setData((prevData) =>
          prevData.map((inv) =>
            inv._id === updatedInvestment._id ? updatedInvestment : inv
          )
        );

        return true;
      } catch (error) {
        console.error("Update error:", error);
        return false;
      }
    },
    [selectedTable]
  );

  const handleDeleteInvestment = useCallback(
    async (investmentId) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/investments/${selectedTable}/${investmentId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        // Update local state immediately
        setData((prevData) =>
          prevData.filter((inv) => inv._id !== investmentId)
        );
        return true;
      } catch (error) {
        console.error("Delete error:", error);
        return false;
      }
    },
    [selectedTable]
  );

  const handleDuplicateInvestment = useCallback(
    async (investment) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/investments/${selectedTable}`,
          {
            //
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(investment),
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const newInvestment = await response.json();

        // Update local state immediately
        setData((prevData) => [...prevData, newInvestment]);
        return true;
      } catch (error) {
        console.error("Duplicate error:", error);
        return false;
      }
    },
    [selectedTable]
  );

  const handleAddNew = () => {
    navigate("/add-investment", { state: { tableName: selectedTable } });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar /> {/* Navbar will appear on all pages */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Private Routes */}
        <Route
          path="/add-investment"
          element={
            <PrivateRoute>
              <AddInvestment />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard
                data={data}
                loading={loading}
                error={error}
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
                handleAddNew={handleAddNew}
                onUpdateInvestment={handleUpdateInvestment}
                onDeleteInvestment={handleDeleteInvestment}
                onDuplicateInvestment={handleDuplicateInvestment}
              />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
