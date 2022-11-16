import { model, Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // we will update this field a bit later when we create review model
  },
  { timestamps: true }
);

export default model("Room", roomSchema);
