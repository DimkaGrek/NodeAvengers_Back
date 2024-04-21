import { Board } from "../models/board.model.js";
import HttpError from "../helpers/HttpError.js";
import { findByFilter } from "../services/findOneService.js";
import { deleteColumnAndCards } from "../services/ColumnService.js";

export const getBoards = async (req, res, next) => {
    try {
        const { id } = req.user;
        const boards = await Board.findByFilter({ userId: id });
        res.json(boards);
    } catch (error) {
        next(error);
    }
};
export const getBoard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await Board.findById(id).populate({
            path: "columns",
            populate: {
                path: "cards",
            },
        });
        if (!board) throw HttpError(404, "Board not found");
        res.json(board);
    } catch (error) {
        next(error);
    }
};
export const createBoard = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.user;
        const findName = await findByFilter(Board, { name });
        if (findName)
            throw HttpError(400, "Board with same name has already created");
        const board = await Board.create({ name, userId: id });
        res.json(board);
    } catch (error) {
        next(error);
    }
};
export const deleteBoard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await Board.findByIdAndDelete(id).populate("columns");
        if (!board) throw HttpError(404, "Board not found");
        board.columns.forEach(async (element) => {
            await deleteColumnAndCards(element._id);
        });
        res.json("Success");
    } catch (error) {
        next(error);
    }
};
export const updateBoard = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const board = await Board.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        if (!board) throw HttpError(404, "Board not found");
        res.json(board);
    } catch (error) {
        next(error);
    }
};
