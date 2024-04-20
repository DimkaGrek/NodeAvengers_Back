import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        columns: { type: Schema.Types.ObjectId, ref: "Colum" },
    },
    { versionKey: false }
);
export const Board = model("Board", BoardSchema);
