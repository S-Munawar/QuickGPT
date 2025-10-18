import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';

interface JwtPayloadWithId extends JwtPayload {
    id?: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            console.warn('[auth] No Authorization header present');
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        let decoded: JwtPayloadWithId;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithId;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userId = decoded.id;
        if (!userId) return res.status(401).json({ message: 'Invalid token' });

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });

        // attach user to request for downstream handlers
        req.user = user;
        return next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};