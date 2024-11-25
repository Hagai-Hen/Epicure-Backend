import express from "express";

import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurants";

const router = express.Router();

router.post("/create", createRestaurant);
router.get("/get/:id", getRestaurant);
router.get("/get", getAllRestaurants);
router.put("/update/:id", updateRestaurant);
router.delete("/delete/:id", deleteRestaurant);

export default router;
