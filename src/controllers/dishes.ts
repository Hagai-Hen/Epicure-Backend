import { Request, Response } from "express";
import Dish from "../models/Dish";
import {
  createDishHandler,
  deleteDishHandler,
  getAllDishesHandler,
  getDishHandler,
  updateDishHandler,
} from "../handlers/dishes";

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await getAllDishesHandler();
    res.status(200).json(dishes);
  } catch (error) {
    console.log("error getting dishes: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getDish = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const dish = await getDishHandler(id);
    res.status(200).json(dish);
  } catch (error) {
    console.log("error getting dish: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedDish = await updateDishHandler(id, updateData);

    res.status(200).json(updatedDish);
  } catch (error) {
    console.log("Error updating Dish: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deletedDish = await deleteDishHandler(id);

    res.status(200).json(deletedDish);
  } catch (error) {
    console.log("Error deleting dish: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const createDish = async (req: Request, res: Response) => {
  try {
    const { name, price, ingredients, tags, restaurant, img } = req.body;

    const newDish = await createDishHandler({
      name,
      price,
      ingredients,
      tags,
      restaurant,
      img,
    });

    res.status(201).json(newDish);
  } catch (error) {
    console.log("error create dish: ", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};
