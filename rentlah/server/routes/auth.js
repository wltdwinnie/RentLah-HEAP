import express from 'express';
import jwt from 'jsonwebtoken'; // ADD THIS MISSING IMPORT
import db from '../config/database.js';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

const auth = express.Router();

auth.get("/test", (req, res) => {
    res.json({ message: "Auth routes are working!" });
});
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// SIGNUP ROUTE
auth.post("/signup", [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: errors.array()[0].msg 
            });
        }

        const { email, password } = req.body;
        console.log("Signup request:", email);

        // Check if user already exists
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Insert user (only email and password since that's what your table has)
        const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        const user = result.rows[0];
        const token = generateToken(user.id);

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// LOGIN ROUTE
auth.post("/login", [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: errors.array()[0].msg 
            });
        }

        const { email, password } = req.body;
        console.log("Login request:", email);

        // Find user
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user.id);

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Basic health check route
auth.get("/health", (req, res) => {
    res.json({ message: "Auth routes working" });
});

export default auth;