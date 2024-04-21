import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
    updateUser,
    getUser,
    changeUserTheme,
} from "../controllers/userController.js";

// upload

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder;
        if (file.fieldname === "avatar") {
            folder = "avatars";
        } else if (file.fieldname === "documents") {
            folder = "documents";
        } else {
            folder = "misc";
        }
        const userId = req.params.id;
        const publicId = userId + "_avatar";
        return {
            folder: folder,
            allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
            public_id: publicId, // Use original filename as the public ID
            transformation: [
                { width: 68, height: 68 },
                { width: 68, height: 68 },
            ],
        };
    },
});

const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.put("/:id", upload.single("avatar"), updateUser);
userRouter.patch("/:id/theme", changeUserTheme);

export default userRouter;
