import express from "express";

import {
    getThemes,
    createTheme,
    updateTheme,
    deleteTheme,
} from "../controllers/themeController.js";
import { validateBody } from "../helpers/ValidateBody.js";
import { themeSchemaJoi } from "../schemas/theme.schema.js";

const themeRouter = express.Router();
themeRouter.get("/", getThemes);
themeRouter.post("/", validateBody(themeSchemaJoi), createTheme);
themeRouter.put("/:id", updateTheme);
themeRouter.delete("/:id", deleteTheme);

export default themeRouter;
