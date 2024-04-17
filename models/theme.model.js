import { Schema, model } from "mongoose";

const ThemeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { versionKey: false }
);
export const Theme = model("Theme", ThemeSchema);
