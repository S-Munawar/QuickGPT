import Chat from '../models/chatModel.js';
import { Request, Response } from 'express';

// API controller for creating new chat
export const createChat = async (req: Request, res: Response) => {
        const userId = req.user._id;
        try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const chatData = {
            userId: userId,
            userName : req.user.name,
            chatName: "New Chat",
            messages: []
        }
        await Chat.create(chatData);
        res.status(201).json({ message: "Chat created successfully" });
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// API to get all chats for a user
export const getChats = async (req: Request, res: Response) => {
    const userId = req.user._id;
    try {
        const chats = await Chat.find({ userId: userId }).sort({ updatedAt: -1 }); // Sort by most recent
        res.status(200).json({ chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// API to get a specific chat
export const getChat = async (req: Request, res: Response) => {
    
    try {
        const userId = req.user._id;
        const chatId = req.body.chatId;
        const chat = await Chat.findOne({ _id: chatId, userId: userId });
        res.status(200).json({ chat });
    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// API to delete a chat
export const deleteChat = async (req: Request, res: Response) => {
    
    try {
        const userId = req.user._id;
        const chatId = req.body.chatId;

        await Chat.findByIdAndDelete({ _id: chatId, userId: userId });
        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error deleting chat:", error);
        res.status(500).json({ message: "Server error" });
    }
};