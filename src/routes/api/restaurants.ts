import express from "express";

import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../controllers/restaurants";
import { validateCreateRestaurant, validateUpdateRestaurant } from "../../middlewares/validation";

const router = express.Router();

router.post("/create", validateCreateRestaurant, createRestaurant);
router.get("/get/:id", getRestaurant);
router.get("/getall", getAllRestaurants);
router.put("/update/:id", validateUpdateRestaurant, updateRestaurant);
router.delete("/delete/:id", deleteRestaurant);

export default router;
