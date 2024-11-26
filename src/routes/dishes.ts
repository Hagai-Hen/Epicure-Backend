import express from "express";

import {
  createDish,
  getDish,
  getAllDishes,
  updateDish,
  deleteDish,
} from "../controllers/dishes";

const router = express.Router();

router.post("/create", createDish);
router.get("/get/:id", getDish);
router.get("/getAll", getAllDishes);
router.put("/update/:id", updateDish);
router.delete("/delete/:id", deleteDish);

export default router;
