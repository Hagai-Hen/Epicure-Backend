import Dish from "../models/Dish";
import { checkUpdateDish, checkCreateDish } from "../services/dishes";
import { DishInterface } from "../interfaces";
import Restaurant from "../models/Restaurant";

export const getAllDishesHandler = async () => {
  const dishes = await Dish.find({});
  if (!dishes) {
    throw new Error("Dishes are empty");
  }
  return dishes;
};

export const getDishHandler = async (id: string) => {
  const dish = await Dish.findById(id);
  if (!dish) {
    throw new Error("Dish not exists");
  }
  return dish;
};

export const updateDishHandler = async (
  id: string,
  updateData: DishInterface
) => {
  const dish = await Dish.findById(id);
  if (!dish) {
    throw new Error("Dish not exists");
  }

  const oldRestaurant = updateData.restaurant;
  if (updateData.restaurant && updateData.restaurant.id) {
    updateData.restaurant = updateData.restaurant.id; // Set the restaurant to just the id
  }

  checkUpdateDish(updateData);
  if (updateData.tags) {
    updateData.tags = updateData.tags.map((tag: string) => tag.toLowerCase());
    updateData.tags = [...new Set(updateData.tags)];
  }
  const updatedDish = await Dish.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return {...updateData, restaurant: oldRestaurant};
};

export const deleteDishHandler = async (id: string) => {
  const dish = await Dish.findByIdAndDelete(id);
  if (!dish) {
    throw new Error("Dish not exists");
  }
  return dish;
};

export const createDishHandler = async (dish: DishInterface) => {
  if (!dish) {
    throw new Error("Dish not valid");
  }
  checkCreateDish(dish);
  dish.tags = dish.tags.map((tag: string) => tag.toLowerCase());
  dish.tags = [...new Set(dish.tags)];

  const newDish = new Dish({
    name: dish.name,
    price: dish.price,
    ingredients: dish.ingredients,
    tags: dish.tags,
    restaurant: dish.restaurant,
    img: dish.img,
  });

  if (!newDish) {
    throw new Error("can't create new dish");
  }

  await newDish.save();
  return newDish;
};

export const getAllDishesPageHandler = async (
  skip: number,
  limit: number
) => {
  const dishes = await Dish.find().skip(skip).limit(limit);
  if (!dishes) {
    throw new Error("dishes are empty");
  }
  return dishes;
};