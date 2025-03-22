const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

connectDB();  // Connect to MongoDB
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json());  // Middleware to parse JSON

const myRoutes = require("./routes/index");
app.use("/api/data", myRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
