import {Router} from "express"
import bcrypt from "bcrypt"
import db from "../database/connection.js"
import { ObjectId } from "mongodb";
import { isLoggedOut } from "../util/loggedInMiddleware.js";

const router = Router();

router.post("/auth/login", isLoggedOut, async (req, res) => {
    try{
    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.users.find({ email: email }).toArray();
    let checkedPassword = "";
    if (user.length !== 0){
        checkedPassword = await bcrypt.compare(password, user[0].password);
        if (checkedPassword){
            req.session.userName = user[0].userName;
            req.session.email = user[0].email;
            req.session.role = user[0].role;
            req.session.isUserLoggedIn = true;
            return res.status(200).send({data: req.session});
        }
    }
    if(!checkedPassword || user.length === 0) {
        return res.status(400).send({message: "Wrong email or password"})
    }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message: "Server error" });
    }
});

router.post("/auth/signup", isLoggedOut, async (req, res) => {
    try{
    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const userName = req.body.userName;
    const email = req.body.email;
    const existingEmail = await db.users.find({ email: email }).toArray();
    const existingUsername = await db.users.find({ userName: userName }).toArray();

    if (existingEmail.length === 0 && existingUsername.length === 0) {
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            userName: userName,
            email: email,
            password: password,
            role: "User"
        };
        await db.users.insertOne(newUser);
        req.session.userName = newUser.userName;
        req.session.email = newUser.email;
        req.session.role = newUser.role;
        req.session.isUserLoggedIn = true;
        return res.status(200).send({ message: "User created successfully" , data: {userName: userName, role: "User"}});
    }       
    else if (existingEmail.length !== 0) {
        return res.status(400).send({ message: "A user with that email already exists" });
    }   
    else if (existingUsername.length !== 0) {
        return res.status(400).send({ message: "A user with that username already exists" });
    }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message: "Server error" });
    }
}); 

router.put("/auth/password", isLoggedOut, async (req, res) => {
    try{
    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const code = req.body.forgotPasswordCode;
    const foundResetPassword = await db.resetCollection.findOne({resetCode: code});

    if (!foundResetPassword){
        return res.status(400).send({message: "Wrong code."})
    };
    if (foundResetPassword.expirationDate < new Date()){
        return res.status(401).send({message: "Expired code."})
    };

    const newPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.users.updateOne({_id: new ObjectId(foundResetPassword.userID)}, {$set: {password: hashedPassword}});
    await db.resetCollection.deleteOne({resetCode: code});
    return res.status(200).send({message: "User updated"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message: "Server error" });
    }
});

export default router;