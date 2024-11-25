import mongoose, { Schema } from "mongoose";

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Dish = mongoose.model("Dish", DishSchema);

export default Dish;
