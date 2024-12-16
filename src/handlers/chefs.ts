import Chef from "../models/Chef";
import { checkCreateChef, checkUpdateChef } from "../services/chefs";
import { ChefInterface } from "../interfaces";
import { updateDishHandler } from "./dishes";

export const getAllChefsHandler = async () => {
  const chefs = await Chef.find({});
  if (!chefs) {
    throw new Error("Chefs are empty");
  }
  return chefs;
};

export const getChefHandler = async (id: string) => {
  const chef = await Chef.findById(id);
  if (!chef) {
    throw new Error("Chef not exists");
  }
  return chef;
};

export const updateChefHandler = async (id: string, updateData: any) => {
  const chef = await Chef.findById(id);
  if (!chef) {
    throw new Error("Chef not exists");
  }
  const oldRestaurants = updateData.restaurants;
  if (updateData.restaurants && Array.isArray(updateData.restaurants)) {
    updateData.restaurants = updateData.restaurants.map((restaurant: any) => {
      return restaurant.id ? restaurant.id : restaurant;
    });
  }
  checkUpdateChef(updateData);
  const updatedChef = await Chef.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return { ...updateData, restaurants: oldRestaurants };
};

export const deleteChefHandler = async (id: string) => {
  const chef = await Chef.findByIdAndDelete(id);
  if (!chef) {
    throw new Error("Chef not exists");
  }
  return chef;
};

export const createChefHandler = async (chef: ChefInterface) => {
  if (!chef) {
    throw new Error("Chef not valid");
  }

  checkCreateChef(chef);

  const newChef = new Chef({
    name: chef.name,
    img: chef.img,
    description: chef.description,
    restaurants: chef.restaurants,
  });

  if (!newChef) {
    throw new Error("can't create new chef");
  }

  await newChef.save();

  return newChef;
};

export const removeSpecificRestaurantHandler = async (
  id: string,
  restaurantId: string
) => {
  const chef = await getChefHandler(id);

  if (!chef || !Array.isArray(chef.restaurants)) {
    throw new Error("Chef data is invalid or restaurants are not an array");
  }

  const newChefRestaurants = chef.restaurants.filter((rest) => {
    return String(rest).trim() !== String(restaurantId).trim();
  });


  if (newChefRestaurants.length !== chef.restaurants.length) {
    const updatedChef = await updateChefHandler(id, {
      restaurants: newChefRestaurants.map((rest) => rest.toString()),
    });
    return updatedChef;
  } else {
    return chef;
  }
};

export const getAllChefsPageHandler = async (skip: number, limit: number) => {
  const chefs = await Chef.find().skip(skip).limit(limit);
  if (!chefs) {
    throw new Error("chefs are empty");
  }
  return chefs;
};
