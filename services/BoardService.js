import { Board } from "../models/board.model.js";

export const findBoard = async (id, userId) => {
try {
   const board = await Board.findOne({ _id: id, userId }).populate({
       path: "columns",
       populate: {
           path: "cards",
       },
   });
  return board
} catch (error) {
  return error
}
}