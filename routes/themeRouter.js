import express from "express";

import {
    getThemes,
    createTheme,
    updateTheme,
    deleteTheme,
} from "../controllers/themeController.js";

const themeRouter = express.Router();
themeRouter.get("/", getThemes);
themeRouter.post("/", createTheme);
themeRouter.put("/:id", updateTheme);
themeRouter.delete("/:id", deleteTheme);

export default themeRouter;
