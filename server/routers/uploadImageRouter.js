import { Router } from "express";
import { uploadImage } from "../util/s3service.js";
import multer from "multer";
import { isAdmin } from "../util/loggedInMiddleware.js";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post("/api/upload", isAdmin, upload.single('image'), async (req, res) => {
    try{
        const image = req.file;
        const imageUrl = await uploadImage(image);
        return res.status(200).send({message: "Image have been uploaded", imageUrl})
    } 
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Server error"})
    }
});

export default router;