import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { LoginHandler, signUpHandler } from "../handlers/auth";

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const {user, token} = await LoginHandler(email, password);

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

export const logOut = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error during logout: ", (err as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await signUpHandler({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("error create user: ", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

