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
}
