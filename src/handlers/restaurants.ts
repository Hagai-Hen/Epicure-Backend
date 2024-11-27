import Restaurant from "../models/Restaurant";
import {
  checkCreateRestaurant,
  checkUpdateRestaurant,
} from "../services/restaurants";
import { RestaurantInterface } from "../interfaces";

export const getAllRestaurantsHandler = async () => {
  const restaurants = await Restaurant.find({});
  if (!restaurants) {
    throw new Error("Restaurants are empty");
  }
  return restaurants;
};

export const getRestaurantHandler = async (id: string) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw new Error("Restaurant not exists");
  }
  return restaurant;
};

export const updateRestaurantHandler = async (
  id: string,
  updateData: RestaurantInterface
) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw new Error("Restaurant not exists");
  }

  checkUpdateRestaurant(updateData);

  const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedRestaurant;
};

export const deleteRestaurantHandler = async (id: string) => {
  const restaurant = await Restaurant.findByIdAndDelete(id);
  if (!restaurant) {
    throw new Error("Restaurant not exists");
  }
  return restaurant;
};

export const createRestaurantHandler = async (
  restaurant: RestaurantInterface
) => {
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
};
