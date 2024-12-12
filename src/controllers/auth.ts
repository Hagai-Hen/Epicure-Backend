import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateToken from "../services/utils";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // in handler
    const user = await User.findOne({
      email,
    });

    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!user || !isMatch) {
      res.status(400).send({ error: "Invalid username or password" });
      return;
    }
    const token = generateToken(user?._id, res);

    res.status(200).json({
      authUser: {
        _id: user._id,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.log("Error during login: ", (err as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error during logout: ", (err as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};
