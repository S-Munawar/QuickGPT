import { OAuth2Client } from 'google-auth-library';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId: any) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '30d' });
};

// API to authenticate with Google
export const googleAuth = async (req: Request, res: Response) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ success: false, message: 'Google credential is required' });
    }

    try {
        // Verify the Google ID token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(400).json({ success: false, message: 'Invalid Google token' });
        }

        const { email, name, sub: googleId } = payload;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            // Link Google ID if not already linked
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            // Create a new user (no password needed for Google auth)
            user = new User({
                name: name || email.split('@')[0],
                email,
                googleId,
            });
            await user.save();
        }

        const token = generateToken(user._id);
        return res.status(200).json({ success: true, message: 'Google login successful', token });

    } catch (error) {
        console.error('Google auth error:', error);
        return res.status(500).json({ success: false, message: 'Google authentication failed' });
    }
};
