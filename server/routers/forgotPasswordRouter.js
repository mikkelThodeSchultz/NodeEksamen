import { Router } from "express";
import db from "../database/connection.js";
import { sendEmail } from "../util/nodemailer.js";
import { ObjectId } from "mongodb";
import { isLoggedOut } from "../util/loggedInMiddleware.js";

const router = Router();

router.post("/api/forgot-password", isLoggedOut, async (req, res) => {
    try{
    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const email = req.body.email
    const foundUser = await db.users.find({email: email}).toArray();
    if (!foundUser){
        return res.status(400).send({message: "No user with that email"})
    };
    const resetPasswordCode = await generateRandomResetCode();
    const message = `Please enter this code: ${resetPasswordCode} to reset your password within 24 hours.`;
    sendEmail(email, 'Forgot Password', message);
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await db.resetCollection.deleteMany({userID: new ObjectId(foundUser[0]._id)});
    await db.resetCollection.insertOne({userID: foundUser[0]._id, resetCode: resetPasswordCode, expirationDate: expirationDate});
    return res.status(200).send({message: `An email has been sent to ${email}`});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message: "Server error" });
    }
});

async function generateRandomResetCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
};

export default router;