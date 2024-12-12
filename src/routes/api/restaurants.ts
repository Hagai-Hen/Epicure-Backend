import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurantsPage,
} from "../../controllers/restaurants";
import { protectAdminRoutes } from "../../middlewares/protectAdminRoutes";
import { protectUserRoutes } from "../../middlewares/protectUserRoutes";

const router = express.Router();

/**
 * @swagger
 * /restaurants/create:
 *   post:
 *     summary: Create a new restaurant
 *     description: Create a new restaurant with the provided name, description, and optional image.
 *     tags:
 *       - Restaurants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "The Gourmet Kitchen"
 *               img:
 *                 type: string
 *                 example: "https://example.com/restaurant.jpg"
 *               chef:
 *                 type: string
 *                 example: "5f8d0d55b54764421b7156c5"
 *               dishes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["5f8d0d55b54764421b7156c5", "5f8d0d55b54764421b7156c5"]
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", protectUserRoutes, createRestaurant);

/**
 * @swagger
 * /restaurants/get/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     description: Retrieve details of a restaurant using its unique ID.
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant details retrieved
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", getRestaurant);

/**
 * @swagger
 * /restaurants/getall:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieve a list of all restaurants.
 *     tags:
 *       - Restaurants
 *     responses:
 *       200:
 *         description: List of restaurants
 *       500:
 *         description: Internal server error
 */
router.get("/getall", getAllRestaurants);

router.get("/get", getAllRestaurantsPage);

/**
 * @swagger
 * /restaurants/update/{id}:
 *   put:
 *     summary: Update a restaurant
 *     description: Update a restaurant's details using its ID.
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant's unique ID
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
 *               img:
 *                 type: string
 *               chef:
 *                 type: string
 *               dishes:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", protectAdminRoutes, updateRestaurant);

/**
 * @swagger
 * /restaurants/delete/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     description: Delete a restaurant by its unique ID.
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", protectAdminRoutes, deleteRestaurant);

export default router;
