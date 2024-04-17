import { Schema, model } from "mongoose";

const EmailSchema = new Schema(
  {
    Title: {
      type: String,
      required: [true, "Title is required"],
    },
    Description: {
      type: String,
      required: [true, "Description is required"],
    },
    UserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false }
);
export const Email = model("Email", EmailSchema);
