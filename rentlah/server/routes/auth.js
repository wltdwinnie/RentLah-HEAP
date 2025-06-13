import express from 'express';
import jwt from 'jsonwebtoken';
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
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: errors.array()[0].msg 
            });
        }

        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log("Signup request:", email);

        // Check if user already exists
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Account already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Insert user
        const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        const user = result.rows[0];
        const token = generateToken(user.id);

        return res.status(201).json({
            message: "Account created successfully! Welcome to RentLah!",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});

// LOGIN ROUTE
auth.post("/login", [
    body('email').isEmail().withMessage('Please enter a valid email address'),
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
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log("Login request:", email);

        // Find user
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "No account found with this email address" });
        }

        const user = result.rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }

        const token = generateToken(user.id);

        return res.json({
            message: "Login successful! Welcome back!",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});

// Basic health check route
auth.get("/health", (req, res) => {
    res.json({ message: "Auth routes working" });
});

export default auth;