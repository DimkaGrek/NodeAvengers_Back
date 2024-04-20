import express from "express";

import {
    createColumController,
    deleteColumController,
    getColumnsController,
    updateColumController,
} from "../controllers/columController.js";

const borderRouter = express.Router();

borderRouter.post("/", createColumController);
borderRouter.put("/:id", updateColumController);
borderRouter.get("/:id", getColumnsController);
borderRouter.delete("/:id", deleteColumController);

export default borderRouter;
