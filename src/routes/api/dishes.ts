import express from "express";

import {
  createDish,
  getDish,
  getAllDishes,
  updateDish,
  deleteDish,
} from "../../controllers/dishes";
import { validateCreateDish, validateUpdateDish } from "../../middlewares/validation";

const router = express.Router();

router.post("/create", validateCreateDish, createDish);
router.get("/get/:id", getDish);
router.get("/getall", getAllDishes);
router.put("/update/:id", validateUpdateDish, updateDish);
router.delete("/delete/:id", deleteDish);

export default router;
