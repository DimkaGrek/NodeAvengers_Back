import { Card } from "../models/card.model.js";
import { Column } from "../models/column.model.js";
import { find } from "../services/findOneService.js";
import HttpError from "../helpers/HttpError.js";

export const getCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await Card.findById(id);
        if (!card) throw HttpError(404, "Card not found");
        res.json(card);
    } catch (error) {
        next(error);
    }
};
export const createCard = async (req, res, next) => {
    try {
        const { title, columnId } = req.body;
        const findName = await find(Card, { title });
        if (findName)
            throw HttpError(400, "Card with same title has already created");
        const column = await find(Column, { _id: columnId });
        if (!column) throw HttpError(404, "Colum not found");
        const card = await Card.create(req.body);
        column.cards.push(card._id);
        await column.save();
        res.json(card);
    } catch (error) {
        next(error);
    }
};
export const deleteCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await Card.findByIdAndDelete(id);
        if (!card) throw HttpError(404, "Card not found");
        res.json("Success");
    } catch (error) {
        next(error);
    }
};
export const updateCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await Card.findByIdAndUpdate(id, req.body, { new: true });
        if (!card) throw HttpError(404, "Card not found");
        res.json(card);
    } catch (error) {
        next(error);
    }
};
