import { Router } from "express";
import db from "../database/connection.js";
import { sendEmail } from "../util/nodemailer.js";

const router = Router();


//TODO Gem resetPasswordCode i databasen, ikke i session, så den ikke kan findes med postman!!!


router.post("/api/forgot-password", async (req, res) => {
    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const email = req.body.email
    const foundUsers = await db.users.find({email: email}).toArray();
    if (!foundUsers){
        return res.status(400).send({message: "No user with that email"})
    };
    const resetPasswordCode = await generateRandomResetCode();
    const message = `Please enter this code: ${resetPasswordCode} to reset your password within 24 hours.`;
    sendEmail(email, 'Forgot Password', message);
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const addToResetCollection = await db.resetCollection.insertOne({userID: foundUsers[0]._id, resetCode: resetPasswordCode, expirationDate: expirationDate});
    return res.status(200).send({message: `An email has been sent to ${email}`});
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