import express from "express";

import {
  createChef,
  getChef,
  getAllChefs,
  updateChef,
  deleteChef,
} from "../../controllers/chefs";
import { validateCreateChef, validateUpdateChef } from "../../middlewares/validation";

const router = express.Router();

router.post("/create", validateCreateChef, createChef);
router.get("/get/:id", getChef);
router.get("/getall", getAllChefs);
router.put("/update/:id", validateUpdateChef, updateChef);
router.delete("/delete/:id", deleteChef);

export default router;
