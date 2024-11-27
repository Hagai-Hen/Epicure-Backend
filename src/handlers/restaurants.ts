import Restaurant from "../models/Restaurant";
import {
  checkCreateRestaurant,
  checkUpdateRestaurant,
} from "../services/restaurants";
import { RestaurantInterface } from "../interfaces";

export const getAllRestaurantsHandler = async () => {
  try {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
      throw new Error("Restaurants are empty");
    }
    return restaurants;
  } catch (error) {
    console.log(
      "error in getAllRestaurantsHandler: ",
      (error as Error).message
    );
    throw error;
  }
};

export const getRestaurantHandler = async (id: string) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not exists");
    }
    return restaurant;
  } catch (error) {
    console.log("error in getRestaurantHandler: ", (error as Error).message);
    throw error;
  }
};

export const updateRestaurantHandler = async (
  id: string,
  updateData: RestaurantInterface
) => {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not exists");
    }
    
    checkUpdateRestaurant(updateData);

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    return updatedRestaurant;
  } catch (error) {
    console.log("error in updateRestaurantHandler: ", (error as Error).message);
    throw error;
  }
};

export const deleteRestaurantHandler = async (id: string) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      throw new Error("Restaurant not exists");
    }
    return restaurant;
  } catch (error) {
    console.log("error in deleteRestaurantHandler: ", (error as Error).message);
    throw error;
  }
};

export const createRestaurantHandler = async (
  restaurant: RestaurantInterface
) => {
  try {
    if (!restaurant) {
      throw new Error("Restaurant not valid");
    }

    checkCreateRestaurant(restaurant);

    const newRestaurant = new Restaurant({
      name: restaurant.name,
      img: restaurant.img,
      chef: restaurant.chef,
      dishes: restaurant.dishes,
    });

    if (!newRestaurant) {
      throw new Error("can't create new restaurant");
    }

    await newRestaurant.save();

    return newRestaurant;
  } catch (error) {
    console.log("error in createRestaurantHandler: ", (error as Error).message);
    throw error;
  }
};
