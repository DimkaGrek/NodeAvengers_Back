import express from "express";

import {
    createColumn,
    deleteColumn,
    getColumns,
    updateColumn,
} from "../controllers/columnController.js";

const columRouter = express.Router();

columRouter.post("/", createColumn);
columRouter.put("/:id", updateColumn);
columRouter.get("/:id", getColumns);
columRouter.delete("/:id", deleteColumn);

export default columRouter;
