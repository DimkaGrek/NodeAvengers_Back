import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    authToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      nullable: true,
    },
    ThemeId: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
    },
  },
  { versionKey: false }
);
export const User = model("User", UserSchema);
