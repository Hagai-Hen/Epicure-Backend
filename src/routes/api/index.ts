import { Router } from "express";
import restaurantsRoutes from "./restaurants";
import chefsRoutes from "./chefs";
import dishesRoutes from "./dishes";
import usersRoutes from './users';

const router = Router();

router.use("/restaurants", restaurantsRoutes);
router.use("/chefs", chefsRoutes);
router.use("/dishes", dishesRoutes);
router.use("/users", usersRoutes);

export default router;
