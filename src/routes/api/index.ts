import { Router } from "express";
import restaurantsRoutes from "./restaurants";
import chefsRoutes from "./chefs";
import dishesRoutes from "./dishes";

const router = Router();

router.use("/restaurants", restaurantsRoutes);
router.use("/chefs", chefsRoutes);
router.use("/dishes", dishesRoutes);

export default router;
