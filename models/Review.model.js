import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, maxlength: 200 },
});

export default model("Review", reviewSchema);
