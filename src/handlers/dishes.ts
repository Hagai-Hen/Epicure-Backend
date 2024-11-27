import Dish from "../models/Dish";
import { checkUpdateDish, checkCreateDish } from "../services/dishes";
import { DishInterface } from "../interfaces";

export const getAllDishesHandler = async () => {
  try {
    const dishes = await Dish.find({});
    if (!dishes) {
      throw new Error("Dishes are empty");
    }
    return dishes;
  } catch (error) {
    console.log("error in getAllDishesHandler: ", (error as Error).message);
    throw error;
  }
};

export const getDishHandler = async (id: string) => {
  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      throw new Error("Dish not exists");
    }
    return dish;
  } catch (error) {
    console.log("error in getDishHandler: ", (error as Error).message);
    throw error;
  }
};

export const updateDishHandler = async (
  id: string,
  updateData: DishInterface
) => {
  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      throw new Error("Dish not exists");
    }
    checkUpdateDish(updateData);
    if (updateData.tags) {
      updateData.tags = updateData.tags.map((tag: string) => tag.toLowerCase());
      updateData.tags = [...new Set(updateData.tags)];
    }
    const updatedDish = await Dish.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedDish;
  } catch (error) {
    console.log("error in updateDishHandler: ", (error as Error).message);
    throw error;
  }
};

export const deleteDishHandler = async (id: string) => {
  try {
    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) {
      throw new Error("Dish not exists");
    }
    return dish;
  } catch (error) {
    console.log("error in deleteDishHandler: ", (error as Error).message);
    throw error;
  }
};

export const createDishHandler = async (dish: DishInterface) => {
  try {
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
    });

    if (!newDish) {
      throw new Error("can't create new dish");
    }

    await newDish.save();

    return newDish;
  } catch (error) {
    console.log("error in updateDishHandler: ", (error as Error).message);
    throw error;
  }
};
