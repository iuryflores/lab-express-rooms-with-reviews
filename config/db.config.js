import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/roomsApp");
    console.log(`Connected to Mongo! DB: ${db.connections[0].name}`);
  } catch (error) {
    console.error(error);
  }
};

connectDb();
