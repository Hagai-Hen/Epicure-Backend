import { Types } from "mongoose";

export interface DishInterface {
  name: string;
  price: number;
  ingredients: string;
  tags: string[];
  restaurant: string;
}

export interface RestaurantInterface {
  name: string;
  img: string;
  chef: string;
  dishes: string[];
  rate: number;
}

export interface ChefInterface {
  name: string;
  img: string;
  description: string;
  restaurants: Types.ObjectId[];
}
