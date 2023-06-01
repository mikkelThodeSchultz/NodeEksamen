import { Router } from "express";
import db from "../database/connection.js";
import { isAdmin, isLoggedIn } from "../util/loggedInMiddleware.js";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/api/chatMessages", isLoggedIn, async (req, res) => {
    try{
        const messages = await db.chatMessages.find().toArray();
        let chatArray = [];

        messages.forEach(message => {
            chatArray.push(message);
        })
        return res.status(200).send({data: chatArray})
    } catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

router.delete("/api/chatMessage/:id", isAdmin, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const messageDelete = await db.chatMessages.deleteOne({_id: id})
        if(messageDelete.deletedCount===0){
            return res.status(400).send({message: "Message does not exist"});
        }
        return res.status(200).send({message: "Message have been deleted"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Sever error"});
    }
});

export async function deleteAllChatMessages(){
    try{
        await db.chatMessages.deleteMany({});
    }catch(error){
        console.log(error);
    }
}

export async function saveMessageFromSocket(message){
    try{
    await db.chatMessages.insertOne(message);
    }
    catch(error){
        console.log(error);
    }
}

export default router;