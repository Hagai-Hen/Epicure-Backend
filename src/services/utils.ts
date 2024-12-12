import { Response } from "express";
import jwt from "jsonwebtoken";


const generateToken = (userId: any) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign({ userId }, jwtSecret, {
      expiresIn: "1m",
    });
    if (!token) {
      throw new Error("Error in generating jwt");
    }
    return token;
  } catch (error) {
    console.log("Error in generating token", (error as Error).message);
  }
};

export default generateToken;
