require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/mainRoutes");

const URL1 = process.env.FRONTEND_URL || "http://localhost:5173";
const URL2 = process.env.FRONTEND_URL || "http://localhost:5000";

const app = express();
app.use(express.json());

app.use(cors({ origin: { URL1, URL2 } }));

// Database Connection
connectDB();

// Routes
app.use("/", router);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
