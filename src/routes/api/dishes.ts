import express from "express";
import {
  createDish,
  getDish,
  getAllDishes,
  updateDish,
  deleteDish,
  getAllDishesPage,
} from "../../controllers/dishes";
import { protectUserRoutes } from "../../middlewares/protectUserRoutes";
import { protectAdminRoutes } from "../../middlewares/protectAdminRoutes";

const router = express.Router();

/**
 * @swagger
 * /dishes/create:
 *   post:
 *     summary: Create a new dish
 *     description: Create a new dish with the provided name, description, and optional image.
 *     tags:
 *       - Dishes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Spaghetti Carbonara"
 *               price:
 *                 type: number
 *                 example: 88
 *               ingredients:
 *                 type: string
 *                 example: "A classic Italian pasta dish."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["spicy", "vegan"]
 *               restaurant:
 *                 type: string
 *                 example: "67472c8ab5f3bae62426d4cb"
 *     responses:
 *       201:
 *         description: Dish created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", protectUserRoutes, createDish);

/**
 * @swagger
 * /dishes/get/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     description: Retrieve details of a dish using its unique ID.
 *     tags:
 *       - Dishes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish details retrieved
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", getDish);

router.get("/get", getAllDishesPage);

/**
 * @swagger
 * /dishes/getall:
 *   get:
 *     summary: Get all dishes
 *     description: Retrieve a list of all dishes.
 *     tags:
 *       - Dishes
 *     responses:
 *       200:
 *         description: List of dishes
 *       500:
 *         description: Internal server error
 */
router.get("/getall", getAllDishes);

/**
 * @swagger
 * /dishes/update/{id}:
 *   put:
 *     summary: Update a dish
 *     description: Update a dish's details using its ID.
 *     tags:
 *       - Dishes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish's unique ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               restaurant:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", protectAdminRoutes, updateDish);

/**
 * @swagger
 * /dishes/delete/{id}:
 *   delete:
 *     summary: Delete a dish
 *     description: Delete a dish by its unique ID.
 *     tags:
 *       - Dishes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Dish's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", protectAdminRoutes, deleteDish);

export default router;
