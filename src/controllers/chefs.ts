import { Request, Response } from "express";
import {
  createChefHandler,
  deleteChefHandler,
  getAllChefsHandler,
  getAllChefsPageHandler,
  getChefHandler,
  updateChefHandler,
} from "../handlers/chefs";
import Chef from "../models/Chef";

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const Chefs = await getAllChefsHandler();
    res.status(200).json(Chefs);
  } catch (error) {
    console.log("error getting Chefs: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getAllChefsPage = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;
    const chefs = await getAllChefsPageHandler(skip, limit);
    const totalChefs = await getChefsCount();
    const totalPages = Math.ceil(totalChefs / limit);

    res.status(200).json({
      chefs,
      pagination: {
        totalItems: totalChefs,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    console.log("error getting chefs: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getChef = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const chef = await getChefHandler(id);
    res.status(200).json(chef);
  } catch (error) {
    console.log("error getting chef: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const updateChef = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedChef = await updateChefHandler(id, updateData);

    res.status(200).json(updatedChef);
  } catch (error) {
    console.log("Error updating chef: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteChef = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedChef = await deleteChefHandler(id);

    res.status(200).json(deletedChef);
  } catch (error) {
    console.log("Error deleting chef: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const createChef = async (req: Request, res: Response) => {
  try {
    const { name, img, description, restaurants } = req.body;

    const newChef = await createChefHandler({
      name,
      img,
      description,
      restaurants,
    });

    res.status(201).json(newChef);
  } catch (error) {
    console.log("error create chef: ", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChefsCount = async () => {
  try {
    const count = await Chef.countDocuments();
    return count;
  } catch (error) {
    throw new Error("Error counting chefs");
  }
};