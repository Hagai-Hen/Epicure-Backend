import { Request, Response, NextFunction } from "express";

export const validateCreateRestaurant = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, img, chef, dishes } = req.body;

  if (!name || name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!chef) {
    throw new Error("Chef is required");
  }

  next();
};

export const validateUpdateRestaurant = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, img, chef, dishes } = req.body;

  if ((name && name.length < 3) || name === "") {
    throw new Error("Name must have at least 3 characters");
  }
  if ((img && img.length < 3) || img === "") {
    throw new Error("Image not valid");
  }
  if (dishes && dishes.length < 1) {
    throw new Error("Dishes must contain at least 1 dish");
  }

  next();
};

export const validateCreateDish = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, ingredients, tags, price } = req.body;

  if (!name || name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!ingredients || ingredients.length < 3) {
    throw new Error("Ingredients not valid");
  }
  if (tags) {
    const newTags = tags.map((tag: string) => tag.toLowerCase());
    const invalidTags = newTags.filter(
      (tag: string) => !["spicy", "vegan", "vegetarian"].includes(tag)
    );
    if (invalidTags.length > 0) {
      throw new Error(`Invalid tag(s): ${invalidTags.join(", ")}`);
    }
  }
  if (!price || price < 0) {
    throw new Error("price must have positive number");
  }
};

export const validateUpdateDish = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, ingredients, tags, price } = req.body;

  if ((name && name.length < 3) || name === "") {
    throw new Error("Name must have at least 3 characters");
  }
  if ((ingredients && ingredients.length < 3) || ingredients === "") {
    throw new Error("Ingredients not valid");
  }
  if (tags) {
    const newTags = tags.map((tag: string) => tag.toLowerCase());
    const invalidTags = newTags.filter(
      (tag: string) => !["spicy", "vegan", "vegetarian"].includes(tag)
    );
    if (invalidTags.length > 0) {
      throw new Error(`Invalid tag(s): ${invalidTags.join(", ")}`);
    }
  }
  if (price && price < 0) {
    throw new Error("price must have positive number");
  }
};

export const validateCreateChef = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, img, description, restaurants } = req.body;

  if (!name || name.length < 3) {
    throw new Error("Name must have at least 3 characters");
  }
  if (!description || description.length < 3) {
    throw new Error("Description must have at least 3 characters");
  }
};

export const validateUpdateChef = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, img, description, restaurants } = req.body;

  if ((name && name.length < 3) || name === "") {
    throw new Error("Name must have at least 3 characters");
  }
  if ((img && img.length < 3) || img === "") {
    throw new Error("Image not valid");
  }
  if ((description && description.length < 3) || description === "") {
    throw new Error("Name must have at least 3 characters");
  }
  if (restaurants && restaurants.length < 1) {
    throw new Error("Restaurants must contain at least 1 item");
  }
};
