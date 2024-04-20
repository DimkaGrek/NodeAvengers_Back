import HttpError from "../helpers/HttpError.js";
import { Colum } from "../models/colum.model.js";
import { findColum } from "../services/ColumService.js";


export const getColumnsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const colum = await Colum.findById(id)
        res.json(colum);
    } catch (error) {
        next(error);
    }
};
export const createColumController = async (req, res, next) => {
    try {
        const { name, boardId } = req.body;
        const findName = await findColum({ name }); // надо буде замінити
        if (findName)
            throw HttpError(400, "Colum with same name has already created");

        const colum = await Colum.create({ name, boardId });
        res.json(colum);
    } catch (error) {
        next(error);
    }
};
export const deleteColumController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const colum = await Colum.findByIdAndDelete(id);
        if (!colum) throw HttpError(404, "Colum not found");

        res.json("Success");
    } catch (error) {
        next(error);
    }
};
export const updateColumController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const colum = await Colum.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        if (!colum) throw HttpError(404, "Colum not found");

        res.json(colum);
    } catch (error) {
        next(error);
    }
};
