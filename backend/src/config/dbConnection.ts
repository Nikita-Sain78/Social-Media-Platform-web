import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const MONGO_URL = process.env.MONGO_URL ?? "";
const DB_NAME = process.env.DB_NAME ?? "";
const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: DB_NAME,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default dbConnection;
