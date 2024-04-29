import express from "express";

import {
    getBoards,
    getBoard,
    createBoard,
    deleteBoard,
    updateBoard,
} from "../controllers/boardController.js";
import { boardParamsSchemaJoi, boardSchemaJoi } from "../schemas/board.schema.js";
import { validateBody } from "../helpers/ValidateBody.js";
import { validateParams } from "../helpers/ValidateParams.js";

const boardRouter = express.Router();
boardRouter.get("/", getBoards);
boardRouter.get("/:id",validateParams(), getBoard);
boardRouter.post("/", validateBody(boardSchemaJoi), createBoard);
boardRouter.put("/:id", validateParams(), updateBoard);
boardRouter.delete("/:id", validateParams(), deleteBoard);

export default boardRouter;
