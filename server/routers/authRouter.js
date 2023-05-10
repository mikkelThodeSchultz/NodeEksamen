import {Router} from "express"
import bcrypt from "bcrypt"
import db from "../database/connection.js"

const router = Router();

router.post("/auth/login", async (req, res) => {

    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.users.find({ email: email }).toArray();
    if (user.length !== 0){
        const checkedPassword = await bcrypt.compare(password, user[0].password);
        if (checkedPassword){
            req.session.userName = user[0].userName;
            req.session.email = user[0].email;
            req.session.role = user[0].role;
            req.session.isUserLoggedIn = true;
            res.send({data: req.session});
        } else {
            res.status(400).send({message: "Wrong password"})
        }
    }
    else {
        res.status(400).send({message: "Wrong email"})
    }
})

router.post("/auth/signup", async (req, res) => {
    
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
            password: password
        };
        await db.users.insertOne(newUser);
        res.status(201).send({ message: "User created successfully" , userName: userName});
    }  else if (existingEmail.length !== 0) {
        res.status(400).send({ message: "A user with that email already exists" });
    } else if (existingUsername.length !== 0) {
        res.status(400).send({ message: "A user with that username already exists" });
    }
}); 

router.put("/auth/password", async (req, res) => {

    if (!req.body){
        return res.status(400).send({message: "Empty body"})
    };
    const code = req.body.forgotPasswordCode;
    if (code !== req.session.resetPasswordCode.toString()){
        return res.status(400).send({message: "Wrong code"})
    }
    const email = req.session.email;
    const newPassword = req.body.newPassword;
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    db.users.updateOne({email: email}, {$set: {password: hashedPassword}});

    return res.status(200).send({message: "User updated"})
});

export default router;