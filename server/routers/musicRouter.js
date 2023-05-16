import { Router } from "express";
import db from "../database/connection.js"
import { isAdmin } from "../util/loggedInMiddleware.js";
import { ObjectId } from "mongodb";
const router = Router();

router.get("/api/allMusic", async (req, res) => {
    try{
        const allMusic = await db.music.find().toArray();
        let musicArray = []
        allMusic.forEach(music => {
            musicArray.push({music})
        })
        return res.status(200).send({data: musicArray})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

router.post("/api/music", isAdmin, async (req, res) => {
    try {
        if (!req.body){
            return res.status(400).send({message: "Empty body"})
        };
        const newMusicProject = {
            artist: req.body.artist,
            albumTitle: req.body.albumTitle,
            releaseDate: req.body.releaseDate,
            image: req.body.image,
            songs: req.body.songs
        }
        await db.music.insertOne(newMusicProject);
        return res.status(200).send({message: "Project have been saved"})
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"})
    }
});

router.delete("/api/music/:id", isAdmin, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const musicDelete = await db.music.deleteOne({_id: id});
        if(musicDelete.deletedCount===0){
            return res.status(400).send({message: "Project does not exist"});
        }
        return res.status(200).send({message: "Project have been deleted"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

export default router;