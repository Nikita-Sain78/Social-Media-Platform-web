import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const MONGO_URL = process.env.MONGO_URL ?? "";
const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default dbConnection;
