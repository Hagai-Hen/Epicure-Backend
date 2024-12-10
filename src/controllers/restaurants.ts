import { Request, Response } from "express";
import {
  createRestaurantHandler,
  deleteRestaurantHandler,
  getRestaurantHandler,
  updateRestaurantHandler,
  getAllRestaurantsHandler,
  getAllRestaurantsPageHandler,
} from "../handlers/restaurants";
import Restaurant from "../models/Restaurant";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await getAllRestaurantsHandler();
    res.status(200).json(restaurants);
  } catch (error) {
    console.log("error getting restaurants: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getAllRestaurantsPage = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;
    const restaurants = await getAllRestaurantsPageHandler(skip, limit);
    const totalRestaurants = await getRestaurantsCount();
    const totalPages = Math.ceil(totalRestaurants / limit);

    res.status(200).json({
      restaurants,
      pagination: {
        totalItems: totalRestaurants,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
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

    res.status(200).json(deletedRestaurant);
  } catch (error) {
    console.log("Error deleting Restaurant: ", (error as Error).message);
    res.status(500).send({ error: "Internal server error" });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, img, chef, dishes, rate } = req.body;

    const newRestaurant = await createRestaurantHandler({
      name,
      img,
      chef,
      dishes,
      rate,
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.log("error create restaurant: ", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRestaurantsCount = async () => {
  try {
    const count = await Restaurant.countDocuments(); // Get total count of restaurants
    return count;
  } catch (error) {
    throw new Error("Error counting restaurants");
  }
};
