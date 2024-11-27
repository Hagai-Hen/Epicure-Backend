import { RestaurantInterface } from "../interfaces";

export const checkUpdateRestaurant = (restaurant: RestaurantInterface) => {
  if (
    (restaurant.name && restaurant.name.length < 3) ||
    restaurant.name === ""
  ) {
    throw new Error("Name must have at least 3 characters");
  }
  if ((restaurant.img && restaurant.img.length < 3) || restaurant.img === "") {
    throw new Error("Image not valid");
  }
  if (restaurant.dishes && restaurant.dishes.length < 1) {
    throw new Error("Dishes must contain at least 1 dish");
  }
};

export const checkCreateRestaurant = (restaurant: RestaurantInterface) => {
  if (!restaurant.name || restaurant.name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!restaurant.chef) {
    throw new Error("Chef is required");
  }
};
