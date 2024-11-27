import Chef from "../models/Chef";
import {
  checkCreateChef,
  checkUpdateChef,
} from "../services/chefs";
import { ChefInterface } from "../interfaces";

export const getAllChefsHandler = async () => {
  try {
    const chefs = await Chef.find({});
    if (!chefs) {
      throw new Error("Chefs are empty");
    }
    return chefs;
  } catch (error) {
    console.log(
      "error in getAllChefsHandler: ",
      (error as Error).message
    );
    throw error;
  }
};

export const getChefHandler = async (id: string) => {
  try {
    const chef = await Chef.findById(id);
    if (!chef) {
      throw new Error("Chef not exists");
    }
    return chef;
  } catch (error) {
    console.log("error in getChefHandler: ", (error as Error).message);
    throw error;
  }
};

export const updateChefHandler = async (
  id: string,
  updateData: ChefInterface
) => {
  try {
    const chef = await Chef.findById(id);
    if (!chef) {
      throw new Error("Chef not exists");
    }
    
    checkUpdateChef(updateData);

    const updatedChef = await Chef.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    return updatedChef;
  } catch (error) {
    console.log("error in updateChefHandler: ", (error as Error).message);
    throw error;
  }
};

export const deleteChefHandler = async (id: string) => {
  try {
    const chef = await Chef.findByIdAndDelete(id);
    if (!chef) {
      throw new Error("Chef not exists");
    }
    return chef;
  } catch (error) {
    console.log("error in deleteChefHandler: ", (error as Error).message);
    throw error;
  }
};

export const createChefHandler = async (
  chef: ChefInterface
) => {
  try {
    if (!chef) {
      throw new Error("Chef not valid");
    }

    checkCreateChef(chef);

    const newChef = new Chef({
      name: chef.name,
      img: chef.img,
      description: chef.description,
      restaurants: chef.restaurants,
  })

    if (!newChef) {
      throw new Error("can't create new chef");
    }

    await newChef.save();

    return newChef;
  } catch (error) {
    console.log("error in createChefHandler: ", (error as Error).message);
    throw error;
  }
};
