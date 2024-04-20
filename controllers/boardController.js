import { Board } from "../models/board.model.js";
import HttpError from "../helpers/HttpError.js";
import { findBoard } from "../services/BoardService.js";

export const getBoardsController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const boards = await Board.find({ userId: id });
        res.json(boards);
    } catch (error) {
        next(error);
    }
};
export const getBoardController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await Board.findById({ _id: id });
       
        console.log( board.populated("columns"));
        await board.populate("columns");
        board.populated("columns");
        console.log(board);
        if (!board) throw HttpError(404, "Board not found");

        res.json(board);
    } catch (error) {
        next(error);
    }
};
export const createBoardController = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.user;
        const findName = await findBoard({ name });

        if (findName)
            throw HttpError(400, "Board with same name has already created");

        const board = await Board.create({ name, userId: id });
        res.json(board);
    } catch (error) {
        next(error);
    }
};
export const deleteBoardController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const board = await Board.findByIdAndDelete(id);
        if (!board) throw HttpError(404, "Board not found");

        res.json("Success");
    } catch (error) {
        next(error);
    }
};
export const updateBoardController = async (req, res, next) => {
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
