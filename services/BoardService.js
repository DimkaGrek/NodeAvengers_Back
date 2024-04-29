import { Board } from "../models/board.model.js";

export const findBoard = async (id) => {
try {
   const board = await Board.findById(id).populate({
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