import { Colum } from "../models/colum.model.js";

export const findColum = (filter) => Colum.findOne(filter);
