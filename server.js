const express = require("express");
const connectDB = require("./config/database");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();

connectDB();  // Connect to MongoDB
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Routes
app.use("/api/data/orders", orderRoutes);

app.use("/api/data", require("./routes/index")); // Other app routes

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
