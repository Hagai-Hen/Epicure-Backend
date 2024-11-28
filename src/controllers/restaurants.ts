import { Request, Response } from "express";
import {
  createRestaurantHandler,
  deleteRestaurantHandler,
  getRestaurantHandler,
  updateRestaurantHandler,
  getAllRestaurantsHandler,
} from "../handlers/restaurants";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await getAllRestaurantsHandler();
    res.status(200).json(restaurants);
  } catch (error) {
    console.log("error getting restaurants: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restaurant = await getRestaurantHandler(id);
    res.status(200).json(restaurant);
  } catch (error) {
    console.log("error getting restaurant: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedRestaurant = await updateRestaurantHandler(id, updateData);

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.log("Error updating Restaurant: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedRestaurant = await deleteRestaurantHandler(id);

    res.status(200).json({
      message: "Restaurant deleted successfully",
      restaurant: deletedRestaurant,
    });
  } catch (error) {
    console.log("Error deleting Restaurant: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, img, chef, dishes } = req.body;

    const newRestaurant = await createRestaurantHandler({
      name,
      img,
      chef,
      dishes,
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log("error create restaurant: ", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};
