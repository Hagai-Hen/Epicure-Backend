import mongoose, { Schema } from "mongoose";

const ChefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
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
