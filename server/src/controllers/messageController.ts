import {openai} from '../config/openai.js';
import Chat from '../models/chatModel.js';
import { Request, Response } from 'express';
import User from '../models/userModel.js';
import axios from 'axios';
import imagekit  from '../config/imagekit.js';


// Text based AI chat controller functions

export const sendMessage = async (req: Request, res: Response) => {


    try {
        const userId = req.user._id;
        const { chatId, prompt } = req.body;
        if (req.user.credits < 1) return res.status(403).json({ message: "Insufficient credits for image generation" });
        const chat = await Chat.findOne({ _id: chatId, userId: userId });
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImage: false });

        const {choices} = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false };

        res.status(200).json({ success: true, message: "Message sent successfully", reply });

        // ✅ Fix: push the reply correctly
        chat.messages.push({ 
        role: reply.role, 
        content: reply.content, 
        timestamp: reply.timestamp, 
        isImage: false 
        });

        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });


    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Image based AI chat controller functions

export const sendImageMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt, isPublished } = req.body;

    if (req.user.credits < 2)
      return res.status(403).json({ message: "Insufficient credits for image generation" });

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    // Add user's prompt message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    });

    const encodedPrompt = encodeURIComponent(prompt);
    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/QuickGPT/${Date.now()}.png?tr:w-800,h-800`;

    // Fetch generated image to ensure it’s ready
    const aiImageResponse = await axios.get(generatedImageUrl, { responseType: "arraybuffer" });
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;

    // Upload the generated image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "QuickGPT",
    });

    // Prepare assistant reply
    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };

    // Push reply to chat and save before responding
    chat.messages.push(reply);
    await chat.save();

    // Deduct credits
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    // Respond *after* everything is saved
    return res.status(200).json({
      success: true,
      message: "Image message sent successfully",
      reply,
    });
  } catch (error) {
    console.error("Error sending image message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// API to get published image messages

export const getPublishedImages = async (req: Request, res: Response) => {
    try {
        const PublishedImages = await Chat.aggregate([
            { $unwind: "$messages" },
            { $match: { "messages.isImage": true, "messages.isPublished": true} },
            { $project: { _id: 0, imageUrl: "$messages.content", userName: "$userName", prompt: "$messages.prompt", timestamp: "$messages.timestamp" } },
        ]);
        res.status(200).json({success: true, images: PublishedImages });
    }
    catch (error) {
        console.error("Error fetching published images:", error);
        res.status(500).json({ message: "Server error" });
    }
};
