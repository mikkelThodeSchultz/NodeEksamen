import { Router } from "express";
import db from "../database/connection.js";
import { isLoggedIn } from "../util/loggedInMiddleware.js";

const router = Router();

//TODO Skal måske slettes da den nok ikke bliver brugt
router.post("/api/chatMessage", isLoggedIn, async (req, res) => {
    try{
        if (!req.body){
            return res.status(400).send({message: "Empty body"})
        };
        const newChatMessage = {
            messsage: req.body.message,
            userName: req.body.userName,
            timeStamp: req.body.timeStamp
        }
        await db.chatMessages.insertOne(newChatMessage);
        return res.status(200).send({message: "Message have been saved"})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"})
    }
});

router.get("/api/chatMessages", isLoggedIn, async (req, res) => {
    try{
        const messages = await db.chatMessages.find().toArray();
        let chatArray = [];

        messages.forEach(message => {
            chatArray.push({userName: message.userName, message: message.message, timeStamp: message.timeStamp});
        })
        return res.status(200).send({data: chatArray})
    } catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
})

export async function saveMessageFromSocket(message){
    try{
    await db.chatMessages.insertOne(message);
    }
    catch(error){
        console.log(error);
    }
}

export default router;