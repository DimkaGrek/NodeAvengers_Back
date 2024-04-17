import { Schema, model } from "mongoose";

const ColumSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    BoardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  { versionKey: false }
);
export const Colum = model("Colum", ColumSchema);
