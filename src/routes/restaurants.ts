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
router.get("/getAll", getAllRestaurants);
router.put("/update/:id", updateRestaurant);
router.delete("/delete/:id", deleteRestaurant);

export default router; 
