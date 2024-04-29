import { Theme } from "../models/theme.model.js";

import HttpError from "../helpers/HttpError.js";

export const getThemes = async (req, res, next) => {
    try {
        const themes = await Theme.find();
        res.json(themes);
    } catch (error) {
        next(error);
    }
};

export const createTheme = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw HttpError(400);
        }
        const theme = await Theme.create({
            name,
        });
        res.status(201).json(theme);
    } catch (error) {
        next(error);
    }
};

export const updateTheme = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            throw HttpError(400);
        }
        const theme = await Theme.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        res.json(theme);
    } catch (error) {
        next(error);
    }
};

export const deleteTheme = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Theme.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
