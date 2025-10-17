import User from "../models/user.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// Generate JWT Token (implementation omitted for brevity)
const generateToken = (userId: any) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '30d' });
};

// API to register a new user
const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ success:false, message: "User already exists" });
            }
            const newUser = new User({ name, email, password });
            await newUser.save();
            const token = generateToken(newUser._id);
            res.status(201).json({ success:true, message: "User registered successfully", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success:false, message: "Server error" });
        }
    } 


// API to login a user
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (email && password) {
            const user = await User.findOne({ email });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = generateToken(user._id);
                    return res.status(200).json({ success:true, message: "Login successful", token });
                }
            }
        }
        return res.status(401).json({ success:false, message: "Invalid email or password" });
    }
    catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: "Server error" });
    }
};

// API to get user profile
const getUserProfile = async (req: Request, res: Response) => {
    
    try {
    const user = req.user;
    return res.status(200).json({ success:true, user });
    } 
    catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: "Server error" });
    }
};

export { registerUser, loginUser, getUserProfile };