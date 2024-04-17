import { Schema, model } from "mongoose";

const CardSchema = new Schema({
  Title: {
    type: String,
    required: [true, "Title is required"],
  },
  Description: {
    type: String,
    required: [true, "Description is required"],
  },
  Priority: {
    type: String,
    enum: {
      values: ["low", "medium", "hight"],
      message: `{VALUE} is not supported choose one of this "low", "medium", "hight"`,
    },
  },
  Deadline: {
    type: Date,
    required: [true, "Deadline is required"], // '2024-04-17T14:00:00.000Z' (год-месяц-деньTчасы:минуты:секунды.миллисекунды)
  },
  ColumId: {
    type: Schema.Types.ObjectId,
    ref: "Colum",
  },
});
export const Card = model("Card", CardSchema);
