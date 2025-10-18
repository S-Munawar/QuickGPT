import Chat from '../models/chatModel.js';
import { Request, Response } from 'express';


// Text based AI chat controller functions

export const sendMessage = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    try {
        const chat = await Chat.findOne({ _id: chatId, userId: userId });
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        chat.messages.push({role: 'user', content: prompt, timestamp: Date.now(), isImage: false, isPublished: false});
        await chat.save();
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
};