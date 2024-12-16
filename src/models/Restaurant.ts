import mongoose, { Schema } from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: "Chef",
    required: true,
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
  rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  chef_name: {
    type: String,
  }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
