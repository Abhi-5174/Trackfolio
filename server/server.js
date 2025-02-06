require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const router = require("./routes/mainRoutes");

const app = express();
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/", router);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
