const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
require("dotenv").config();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns user details.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Missing or invalid fields
 */
router.post("/register", async (req, res) => {
    //#swagger.tags = ['User']
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Missing fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get a JWT token
 *     description: User logs in and receives a JWT token for authentication.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post("/login", async (req, res) => {
    //#swagger.tags = ['User']
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected - Example of a route that requires authentication
router.get("/profile", authMiddleware, async (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;

