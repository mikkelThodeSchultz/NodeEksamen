import {Router} from "express"
import db from "../database/connection.js"
import { ObjectId } from "mongodb";

const router = Router();

router.get("/api/users", async (req, res) => {
    try{
        const users = await db.users.find().toArray();
        let userArray = [];

        users.forEach(user => {
            userArray.push({_id: user._id, userName: user.userName, role: user.role});
        });
        return res.status(200).send({data: userArray});
    } catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

//HUSK måske det kun admin der må have adgang til at opdatere
router.put("/api/user/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updatedUser = req.body;
        const userUpdate = await db.users.updateOne({_id: id}, {$set: updatedUser});
        if(userUpdate.modifiedCount===0){
            return res.status(400).send({message: "User does not exist"});
        }
        return res.status(200).send({message: "User have been updated"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

router.delete("/api/user/:id", async (req, res ) => {
    try {
        const id = new ObjectId(req.params.id);
        const userDelete = await db.users.deleteOne({_id: id});
        if(userDelete.deletedCount===0){
            return res.status(400).send({message: "User does not exist"});
        }
        return res.status(200).send({message: "User have been deleted"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"});
    }
});

export default router;