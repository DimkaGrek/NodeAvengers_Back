import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);
export const Board = model("Board", BoardSchema);
