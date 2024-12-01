import mongoose, { Schema } from "mongoose";

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  img: {
    type: String,
  }
});

const Dish = mongoose.model("Dish", DishSchema);

export default Dish;
