import { Card } from "../models/card.model.js";
import { Column } from "../models/column.model.js";
import { findByFilter } from "../services/FindOneService.js";
import HttpError from "../helpers/HttpError.js";
import { findBoard } from "../services/BoardService.js";

export const getCard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await Card.findOne({ id });
        if (!card) throw HttpError(404, "Card not found");
        res.json(card);
    } catch (error) {
        next(error);
    }
};
export const createCard = async (req, res, next) => {
    try {
        const { title, columnId, boardId } = req.body;
        const board = await findBoard(boardId);
        let isExist = false;
        board.columns.forEach((element) => {
            const isExistCard = element.cards.find(
                (card) => card.title === title
            );
            if (isExistCard) isExist = true;
        });
        if (isExist)
            throw HttpError(400, "Card with same title has already created");
        const column = await findByFilter(Column, { _id: columnId });
        if (!column) throw HttpError(404, "Colum not found");
        const card = await Card.create(req.body);
        column.cards.push(card._id);
        await column.save();
        res.status(201).json(card);
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
        const { columnId, boardId, title } = req.body;
        const card = await Card.findById(id);

        if (!card) throw HttpError(404, "Card not found");

        if (card.title !== title) {
            const board = await findBoard(boardId);
            let isExist = false;
            board.columns.forEach((element) => {
                const isExistCard = element.cards.find(
                    (card) => card.title === title
                );
                if (isExistCard) isExist = true;
            });

            if (isExist)
                throw HttpError(404, "Card with same title has already exist");
        }

        if (columnId) {
            await Column.updateMany(
                { cards: id },
                { $pull: { cards: id } },
                { multi: true }
            );

            const newColum = await Column.findById(columnId);

            newColum.cards.push(id);
            await newColum.save();
        }
        const result = await Card.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
};
