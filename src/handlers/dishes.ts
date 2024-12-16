import Dish from "../models/Dish";
import { checkUpdateDish, checkCreateDish } from "../services/dishes";
import { DishInterface } from "../interfaces";
import { getRestaurantHandler, updateRestaurantHandler } from "./restaurants";
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
  // removeSpecificDishHandler(dish._id.toString(), dish.restaurant.toString())
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

  //add dish to restaurant
  // const restaurant = await getRestaurantHandler(dish.restaurant);
  // if (!restaurant) throw new Error("Restaurant not exists!!");
  // restaurant.dishes.push(newDish._id);
  // const updatedDish = await updateRestaurantHandler(restaurant.id, restaurant);

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

export const removeSpecificDishHandler = async (
  id: string,
  restaurantId: string
) => {
  const restaurant = await getRestaurantHandler(restaurantId);

  if (!restaurant || !Array.isArray(restaurant.dishes)) {
    throw new Error("restaurant data is invalid or restaurants are not an array");
  }

  const newRestaurantsDishes = restaurant.dishes.filter((dish) => {
    return String(dish).trim() !== String(id).trim();
  });


  if (newRestaurantsDishes.length !== restaurant.dishes.length) {
    const updatedRestaurant = await updateRestaurantHandler(restaurantId, {
      dishes: newRestaurantsDishes.map((dish) => {
        return dish.toString();
      }),
    });
    return updatedRestaurant;
  } else {
    return restaurant;
  }
};