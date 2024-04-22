import express from "express";

import {
    createColumn,
    deleteColumn,
    getColumns,
    updateColumn,
} from "../controllers/columnController.js";
import { columnSchemaJoi } from "../schemas/column.schema.js";
import { validateBody } from "../helpers/ValidateBody.js";

const columRouter = express.Router();

columRouter.post("/", validateBody(columnSchemaJoi), createColumn);
columRouter.put("/:id", updateColumn);
columRouter.get("/:id", getColumns);
columRouter.delete("/:id", deleteColumn);

export default columRouter;
