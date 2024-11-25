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
    ref: "Restaurant",
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
