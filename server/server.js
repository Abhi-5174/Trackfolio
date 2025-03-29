require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/mainRoutes");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BACKEND_URL = process.env.FRONTEND_URL || "http://localhost:5000";

const app = express();
app.use(express.json());
app.use(helmet());

app.use(cors({ origin: [FRONTEND_URL, BACKEND_URL] }));

// Routes
app.use("/", router);

// Serve static files from the "dist" folder (Vite build output)
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all route to serve index.html for React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Database Connection
  connectDB();
  console.log("Server started on http://localhost:" + PORT);
});
