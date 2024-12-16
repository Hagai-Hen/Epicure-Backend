import { DishInterface } from "../interfaces";

export const checkDishTags = (tags: string[]) => {
  tags = tags.map((tag: string) => tag.toLowerCase());
  const invalidTags = tags.filter(
    (tag: string) => !["spicy", "vegan", "vegetarian"].includes(tag)
  );
  if (invalidTags.length > 0) {
    throw new Error(`Invalid tag(s): ${invalidTags.join(", ")}`);
  }
};

export const checkUpdateDish = (dish: DishInterface) => {
  if ((dish.name && dish.name.length < 3) || dish.name === "") {
    throw new Error("Name must have at least 3 characters");
  }
  if (
    (dish.ingredients && dish.ingredients.length < 3) ||
    dish.ingredients === ""
  ) {
    throw new Error("Ingredients not valid");
  }
  if (dish.tags) {
    checkDishTags(dish.tags);
  }
  if (dish.price && dish.price < 0) {
    throw new Error("price must have positive number");
  }
  if ((dish.img && dish.img.length < 3) || dish.img === "") {
    throw new Error("Image must have at least 3 characters");
  }
};

export const checkCreateDish = (dish: DishInterface) => {
  if (!dish.name || dish.name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!dish.ingredients || dish.ingredients.length < 3) {
    throw new Error("Ingredients not valid");
  }
  if (dish.tags) {
    checkDishTags(dish.tags);
  }
  if (!dish.price || dish.price < 0) {
    throw new Error("price must have positive number");
  }
};
