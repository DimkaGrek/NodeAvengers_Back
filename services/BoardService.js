import { Board } from "../models/board.model.js";

export const findBoard = (filter) => Board.findOne(filter);
