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
