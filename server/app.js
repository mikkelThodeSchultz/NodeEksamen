import dotenv from "dotenv/config";
import express from "express";
import cron from "node-cron";
import multer from "multer";

const app = express();
app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/dist")));

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
        origin: "http://localhost:5173"
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
import chatRouter, {saveMessageFromSocket, deleteAllChatMessages} from "./routers/chatRouter.js";
app.use(chatRouter);
import musicRouter from "./routers/musicRouter.js";
app.use(musicRouter);
import showRouter from "./routers/showRouter.js";
app.use(showRouter);
import commentRouter, { saveCommentFromSocket } from "./routers/commentRouter.js";
app.use(commentRouter);
import uploadImageRouter from "./routers/uploadImageRouter.js";
app.use(uploadImageRouter);

app.get("*", (req, res) => {
    res.send("<h1>404 - Not Found</h1>")
});

cron.schedule('0 0 * * 0', () => {
    deleteAllChatMessages();
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if (error){
        console.log(error)
    };
    console.log("Server is running on port: ", PORT)
});