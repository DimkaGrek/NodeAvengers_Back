import express from "express";

import {
    getBoardsController,
    getBoardController,
    createBoardController,
    deleteBoardController,
    updateBoardController,
} from "../controllers/boardController.js";

const borderRouter = express.Router();

borderRouter.get("/", getBoardsController);
borderRouter.get("/:id", getBoardController);
borderRouter.post("/", createBoardController);
borderRouter.put("/:id", updateBoardController);
borderRouter.delete("/:id", deleteBoardController);

export default borderRouter;
