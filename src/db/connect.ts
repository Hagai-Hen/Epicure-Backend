import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL: string = process.env.MONGODB_URL || "";

const db = async () => {
  try {
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in the .env file");
    }
    const con = await mongoose.connect(MONGODB_URL);
    console.log(`mongodb connected: ${con.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

export default db;
