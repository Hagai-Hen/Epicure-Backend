import { Request, Response } from "express";
import { createUserHandler } from "../handlers/users";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password, role } = req.body;

    const newUser = await createUserHandler({
      name,
      surname,
      email,
      password,
      role,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("error create user: ", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};
