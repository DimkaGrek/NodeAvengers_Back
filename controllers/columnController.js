import HttpError from "../helpers/HttpError.js";
import { Board } from "../models/board.model.js";
import { Column } from "../models/column.model.js";
import { deleteColumnAndCards } from "../services/ColumnService.js";
import { find } from "../services/findOneService.js";

export const getColumns = async (req, res, next) => {
    try {
        const { id } = req.params;
        const colum = await Column.findById(id);
        res.json(colum);
    } catch (error) {
        next(error);
    }
};
export const createColumn = async (req, res, next) => {
    try {
        const { name, boardId } = req.body;
        const board = await Board.findById(boardId).populate('columns');
        const isExistName = board.columns.find((el) => {
           return el.name === name
        });
        if (isExistName)
            throw HttpError(400, "Colum with same name has already created");
        const column = await Column.create({ name, boardId });
        board.columns.push(column._id);
        await board.save();
        res.json(column);
    } catch (error) {
        next(error);
    }
};
export const deleteColumn = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteColumnAndCards(id);
        res.json("Success");
    } catch (error) {
        next(error);
    }
};
export const updateColumn = async (req, res, next) => {
    try {
        const { id } = req.params;
        const colum = await Column.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!colum) throw HttpError(404, "Colum not found");
        res.json(colum);
    } catch (error) {
        next(error);
    }
};
