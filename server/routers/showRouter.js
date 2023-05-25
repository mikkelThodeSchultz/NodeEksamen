import { Router } from "express";
import db from "../database/connection.js"
import { isAdmin } from "../util/loggedInMiddleware.js";
import { ObjectId } from "mongodb";
const router = Router();

router.get("/api/shows", async (req, res) => {
    try{
        const shows = await db.show.find().toArray();
        let showArray = [];

        shows.forEach(show => {
            showArray.push({show})
        });
        return res.status(200).send({data: showArray})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"})
    }
});

router.post("/api/show", isAdmin, async (req, res) => {
    try{
        if(!req.body){
            return res.status(400).send({message: "Empty body"})
        };
        const newShow = {
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description,
            image: req.body.image,
            event: req.body.event
        }
        await db.show.insertOne(newShow);
        return res.status(200).send({message: "Show have been saved"})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"})
    }
});

router.delete("/api/show/:id", isAdmin, async (req, res) => {
    try{
        const id = new ObjectId(req.params.id);
        const showDelete = await db.show.deleteOne({_id: id});
        if(showDelete.deletedCount===0){
            return res.status(400).send({message: "Show does not exist"});
        }
        return res.status(200).send({message: "Show have been deleted"})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

export default router;