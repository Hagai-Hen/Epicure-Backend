import express from "express";
import {
  createChef,
  getChef,
  getAllChefs,
  updateChef,
  deleteChef,
  getAllChefsPage,
} from "../../controllers/chefs";
import { protectUserRoutes } from "../../middlewares/protectUserRoutes";
import { protectAdminRoutes } from "../../middlewares/protectAdminRoutes";

const router = express.Router();

/**
 * @swagger
 * /chefs/create:
 *   post:
 *     summary: Create a new chef
 *     description: Create a new chef with the provided name, description, and optional image.
 *     tags:
 *       - Chefs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Gordon Ramsay"
 *               img:
 *                 type: string
 *                 example: "https://example.com/chef.jpg"
 *               description:
 *                 type: string
 *                 example: "World-renowned chef."
 *               restaurants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["5f8d0d55b54764421b7156c5"]
 *     responses:
 *       201:
 *         description: Chef created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/create", protectUserRoutes, createChef);

/**
 * @swagger
 * /chefs/get/{id}:
 *   get:
 *     summary: Get a chef by ID
 *     description: Retrieve details of a chef using their unique ID.
 *     tags:
 *       - Chefs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Chef's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef details retrieved
 *       404:
 *         description: Chef not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", getChef);

/**
 * @swagger
 * /chefs/getall:
 *   get:
 *     summary: Get all chefs
 *     description: Retrieve a list of all chefs.
 *     tags:
 *       - Chefs
 *     responses:
 *       200:
 *         description: List of chefs
 *       500:
 *         description: Internal server error
 */
router.get("/getall", getAllChefs);

router.get("/get", getAllChefsPage);

/**
 * @swagger
 * /chefs/update/{id}:
 *   put:
 *     summary: Update a chef
 *     description: Update a chef's details using their ID.
 *     tags:
 *       - Chefs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Chef's unique ID
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
 *               description:
 *                 type: string
 *               restaurants:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Chef updated successfully
 *       404:
 *         description: Chef not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", protectAdminRoutes, updateChef);

/**
 * @swagger
 * /chefs/delete/{id}:
 *   delete:
 *     summary: Delete a chef
 *     description: Delete a chef by their unique ID.
 *     tags:
 *       - Chefs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Chef's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chef deleted successfully
 *       404:
 *         description: Chef not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", protectAdminRoutes, deleteChef);

export default router;
