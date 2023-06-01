import { Router } from "express";
const router = Router();
import { isLoggedIn } from "../util/loggedInMiddleware.js";

router.get("/api/session", async (req, res) => {
    const sessionData = {
        isUserLoggedIn: req.session.isUserLoggedIn,
        userRole: req.session.role,
        userName: req.session.userName
    }
    res.json(sessionData);
});

router.get("/api/logout", isLoggedIn, async (req, res) => {
    req.session.destroy();
    res.json(req.session)
});

export default router;