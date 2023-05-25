import dotenv from "dotenv/config";
import express from "express";
import { saveMessageFromSocket } from "./routers/chatRouter.js";

const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import helmet from "helmet"
app.use(helmet());

import session from "express-session"
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
}));

import rateLimit from 'express-rate-limit'
app.use("/api/forgot-password", rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 3, 
	standardHeaders: true, 
	legacyHeaders: false
}));
app.use("/auth", rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 10, 
	standardHeaders: true, 
	legacyHeaders: false
}));

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*", //Should be specific origin and methods in production
        methods: ["*"]
    }
});

io.on("connection", (socket) => {
    console.log("A socket connected", socket.id);

    socket.on("chat message to server", async message => {
        await saveMessageFromSocket(message);
        io.emit("chat message to client", message);
    });

    socket.on("music comment to server", async comment => {
        await saveCommentFromSocket(comment);
        io.emit("music comment to client", comment);
    })

});



import authRouter from "./routers/authRouter.js";
app.use(authRouter);
import forgotPasswordRouter from "./routers/forgotPasswordRouter.js";
app.use(forgotPasswordRouter);
import sessionRouter from "./routers/sessionRouter.js";
app.use(sessionRouter);
import userRouter from "./routers/userRouter.js";
app.use(userRouter);
import chatRouter from "./routers/chatRouter.js";
app.use(chatRouter);
import musicRouter from "./routers/musicRouter.js";
app.use(musicRouter);
import showRouter from "./routers/showRouter.js";
app.use(showRouter);
import commentRouter, { saveCommentFromSocket } from "./routers/commentRouter.js"
app.use(commentRouter);

app.get("*", (req, res) => {
    res.send("<h1>404 - Not Found</h1>")
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if (error){
        console.log(error)
    };
    console.log("Server is running on port: ", PORT)
});