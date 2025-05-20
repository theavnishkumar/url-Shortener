/* eslint-disable no-undef */
import bcrypt from "bcrypt";
import { Users } from "../models/users.js"
import { Logins } from "../models/Logins.js";
import { generateToken } from "../utils/jwt.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import dotenv from "dotenv"
dotenv.config();

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    // Checking input fields
    if (!email || !password) return res.status(400).json({ error: "All Fields are required" });

    try {
        const user = await Users.findOne({ email });

        // Checking existing user
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Password Validating
        const psswordValidate = await bcrypt.compare(password, user.password);
        if (!psswordValidate) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Generating jwt token
        const token = generateToken(user._id);

        // Set HTTP-only cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        // Getting user gro location
        const ip = getClientIp(req);
        const userAgent = req.headers["user-agent"];
        const location = await getLocationFromIp(ip);

        // Saving login details
        const login = new Logins({
            userId: user._id,
            ipAddress: ip,
            userAgent,
            location,
            loginAt: new Date(),
        })
        await login.save();

        return res.status(200).json({ message: "Login Successful" });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Server error from handle login" });
    }
}


export const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;

    // Checking input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const existingUser = await Users.findOne({ email });

        // Checking existing of user
        if (existingUser)
            return res.status(400).json({ error: "User already exists" });

        // Getting geo details
        const ip = getClientIp(req);
        const userAgent = req.headers["user-agent"];
        const location = await getLocationFromIp(ip);

        // Hashing user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Saving user to database
        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            avatar: "https://avatar.iran.liara.run/public/7",
            ipAddress: ip,
            userAgent,
            location,
            signupAt: new Date(),
        });
        await newUser.save();

        // Generating jwt token
        const token = generateToken(newUser._id);

        // Set HTTP-only cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export const handleUserLogout = async (req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
}