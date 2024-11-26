import mongoose, { Schema } from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: "Chef",
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

const Restaurant = mongoose.model("Restaurants", RestaurantSchema);

export default Restaurant;
