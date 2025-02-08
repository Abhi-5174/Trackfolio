const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/PortfolioTracker";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);

        // Retry connection every 5 seconds if the connection fails
        setTimeout(connectDB, 5000);
    }
};

// MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection lost, attempting to reconnect...');
});

module.exports = connectDB;
