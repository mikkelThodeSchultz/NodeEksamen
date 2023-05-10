import { Router } from "express";
import db from "../database/connection.js";
import { sendEmail } from "../util/nodemailer.js";

const router = Router();

router.post("/api/forgot-password", async (req, res) => {
    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const email = req.body.email
    const founderUsers = await db.users.find({email: email}).toArray();
    if (!founderUsers){
        return res.status(400).send({message: "No user with that email"})
    };

    const resetPasswordCode = await generateRandomResetCode();

    req.session.resetPasswordCode = resetPasswordCode;
    req.session.email = email;
    const message = `Please enter this code: ${resetPasswordCode} to reset your password.`
    sendEmail(email, 'Forgot Password', message);
    return res.status(200).send({data: req.session});
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