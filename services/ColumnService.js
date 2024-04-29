import { Card } from "../models/card.model.js";
import { Column } from "../models/column.model.js";

export const deleteColumnAndCards = async (id) => {
    try {
        const colum = await Column.findByIdAndDelete(id);
        if (!colum) throw HttpError(404, "Colum not found");
        await Card.deleteMany({ columnId: id });
    } catch (error) {
        return error;
    }
};
