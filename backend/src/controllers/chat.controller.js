import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";

export async function sendMessage(req, res) {
    const { message } = req.body;
   
    const title = await generateChatTitle(message);
    const result = await generateResponse(message);

    const chat = await chatModel.create({
        user: req.user.id,
        title,
    })

    const AIMessage = await messageModel.create({
        chat: chat._id,
        content: result.text,
        role: "ai",
    })

    res.status(200).json({
        AIMessage: result.text,
        title,
        chat,
        AIMessage
    })
    
}