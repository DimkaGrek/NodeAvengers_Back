import express from "express";

import {
    getCard,
    createCard,
    deleteCard,
    updateCard,
} from "../controllers/cardController.js";
import { cardSchemaJoi } from "../schemas/card.schema.js";
import { validateBody } from "../helpers/ValidateBody.js";

const cardRouter = express.Router();
cardRouter.get("/:id", getCard);
cardRouter.post("/", validateBody(cardSchemaJoi), createCard);
cardRouter.put("/:id", updateCard);
cardRouter.delete("/:id", deleteCard);

export default cardRouter;
