import mongoose, { Schema } from "mongoose";

const ChefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

const Chef = mongoose.model("Chef", ChefSchema);

export default Chef;
