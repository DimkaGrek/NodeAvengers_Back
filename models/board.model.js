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
        icon: {
            type: Number,
            required: [true, "icon number is required"],
        },
        backgroundImage: {
            type: Number,
            required: [true, "backgroundImage number is required"],
        },
        columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
    },
    { versionKey: false }
);
export const Board = model("Board", BoardSchema);
