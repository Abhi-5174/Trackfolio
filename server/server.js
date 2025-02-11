require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/mainRoutes");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BACKEND_URL = process.env.FRONTEND_URL || "http://localhost:5000";

const app = express();
app.use(express.json());
app.use(helmet());

app.use(cors({ origin: [FRONTEND_URL, BACKEND_URL] }));

// Database Connection
connectDB();

// Routes
app.use("/", router);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
