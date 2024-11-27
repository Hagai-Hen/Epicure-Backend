import { ChefInterface } from "../interfaces";

export const checkUpdateChef = (chef: ChefInterface) => {
  if (
    (chef.name && chef.name.length < 3) ||
    chef.name === ""
  ) {
    throw new Error("Name must have at least 3 characters");
  }
  if ((chef.img && chef.img.length < 3) || chef.img === "") {
    throw new Error("Image not valid");
  }
  if ((chef.description && chef.description.length < 3) || chef.description === "") {
    throw new Error("Name must have at least 3 characters");
  }
  if (chef.restaurants && chef.restaurants.length < 1) {
    throw new Error("Restaurants must contain at least 1 item");
  }
};

export const checkCreateChef = (chef: ChefInterface) => {
  if (!chef.name || chef.name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!chef.description || chef.description.length < 3) {
    throw new Error("Description must have at least 3 characters");
  }
};
