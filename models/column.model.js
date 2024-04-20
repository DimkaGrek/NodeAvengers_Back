import { Schema, model } from "mongoose";

const ColumnSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        boardId: {
            type: Schema.Types.ObjectId,
            ref: "Board",
        },
        cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    },
    { versionKey: false }
);
export const Column = model("Column", ColumnSchema);
