import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const generateToken = (userId: any, res: Response) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign({ userId }, jwtSecret, {
      expiresIn: "15d",
    });
    if (!token) {
      throw new Error("Error in generating jwt");
    }
    return token;
  } catch (error) {
    console.log("Error in generating token", (error as Error).message);
    res.status(500).send("Internal Server Error");
  }
};

export default generateToken;
