import express from "express";

import {
    getCard,
    createCard,
    deleteCard,
    updateCard,
} from "../controllers/cardController.js";

const cardRouter = express.Router();
cardRouter.get("/:id", getCard);
cardRouter.post("/", createCard);
cardRouter.put("/:id", updateCard);
cardRouter.delete("/:id", deleteCard);

export default cardRouter;
