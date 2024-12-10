import { Request, Response } from "express";
import Dish from "../models/Dish";
import {
  createDishHandler,
  deleteDishHandler,
  getAllDishesHandler,
  getAllDishesPageHandler,
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

export const getAllDishesPage = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;
    const dishes = await getAllDishesPageHandler(skip, limit);
    const totalDishes = await getDishesCount();
    const totalPages = Math.ceil(totalDishes / limit);

    res.status(200).json({
      dishes,
      pagination: {
        totalItems: totalDishes,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
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

export const getDishesCount = async () => {
  try {
    const count = await Dish.countDocuments();
    return count;
  } catch (error) {
    throw new Error("Error counting dishes");
  }
};
