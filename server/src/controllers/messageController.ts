import {openai} from '../config/openai.js';
import Chat from '../models/chatModel.js';
import { Request, Response } from 'express';
import User from '../models/userModel.js';


// Text based AI chat controller functions

export const sendMessage = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    try {
        const chat = await Chat.findOne({ _id: chatId, userId: userId });
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });

        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = response.choices[0].message;
        res.status(200).json({ message: "Message sent successfully" });

        chat.messages.push({ reply, timestamp: Date.now(), isImage: false});
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
};