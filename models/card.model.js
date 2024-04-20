import { Schema, model } from "mongoose";

const CardSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        priority: {
            type: String,
            enum: {
                values: ["low", "medium", "high"],
                message: `{VALUE} is not supported choose one of this "low", "medium", "hight"`,
            },
        },
        deadline: {
            type: Date,
            required: [true, "Deadline is required"], // '2024-04-17T14:00:00.000Z' (год-месяц-деньTчасы:минуты:секунды.миллисекунды)
        },
        columnId: {
            type: Schema.Types.ObjectId,
            ref: "Column",
        },
    },
    { versionKey: false }
);
export const Card = model("Card", CardSchema);
