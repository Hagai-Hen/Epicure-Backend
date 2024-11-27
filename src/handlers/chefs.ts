import Chef from "../models/Chef";
import { checkCreateChef, checkUpdateChef } from "../services/chefs";
import { ChefInterface } from "../interfaces";

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

export const updateChefHandler = async (
  id: string,
  updateData: ChefInterface
) => {
  const chef = await Chef.findById(id);
  if (!chef) {
    throw new Error("Chef not exists");
  }

  checkUpdateChef(updateData);

  const updatedChef = await Chef.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedChef;
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
