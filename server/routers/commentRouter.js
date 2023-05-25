import { Router } from "express";
import db from "../database/connection.js";
import { isAdmin, isLoggedIn } from "../util/loggedInMiddleware.js";
import { ObjectId } from "mongodb";
import router from "./chatRouter.js";


router.get("/api/comments", async (req, res) => {
    try{
        const comments = await db.comments.find().toArray();
        let commentArray = [];
        comments.forEach(comment => {
            commentArray.push(comment)
        })
        return res.status(200).send({data: commentArray})
    } catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

export async function saveCommentFromSocket(comment){
    try{
    await db.comments.insertOne(comment);
    }
    catch(error){
        console.log(error);
    }
};

export default router;