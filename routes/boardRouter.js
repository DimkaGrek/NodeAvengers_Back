import express from "express";

import {
    getBoards,
    getBoard,
    createBoard,
    deleteBoard,
    updateBoard,
} from "../controllers/boardController.js";

const boardRouter = express.Router();
boardRouter.get("/", getBoards);
boardRouter.get("/:id", getBoard);
boardRouter.post("/", createBoard);
boardRouter.put("/:id", updateBoard);
boardRouter.delete("/:id", deleteBoard);

export default boardRouter;
