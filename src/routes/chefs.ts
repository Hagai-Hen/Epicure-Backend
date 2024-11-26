import express from "express";

import {
  createChef,
  getChef,
  getAllChefs,
  updateChef,
  deleteChef,
} from "../controllers/chefs";

const router = express.Router();

router.post("/create", createChef);
router.get("/get/:id", getChef);
router.get("/getall", getAllChefs);
router.put("/update/:id", updateChef);
router.delete("/delete/:id", deleteChef);

export default router;
