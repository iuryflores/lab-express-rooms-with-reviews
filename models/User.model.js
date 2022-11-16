import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    fullName: String,
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
