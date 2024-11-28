import { Request, Response } from "express";
import { createChefHandler, deleteChefHandler, getAllChefsHandler, getChefHandler, updateChefHandler } from "../handlers/chefs";

export const getAllChefs = async (req: Request, res: Response) => {
    try {
        const Chefs = await getAllChefsHandler();
        res.status(200).json(Chefs);

    } catch (error) {
        console.log("error getting Chefs: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const getChef = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const chef = await getChefHandler(id);
        res.status(200).json(chef);

    } catch (error) {
        console.log("error getting chef: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const updateChef = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedChef = await updateChefHandler(id, updateData);

        res.status(200).json(updatedChef);
    } catch (error) {
        console.log("Error updating chef: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const deleteChef = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedChef = await deleteChefHandler(id);

        res.status(200).json({
            message: 'Chef deleted successfully',
            chef: deletedChef,
          });
    } catch (error) {
        console.log("Error deleting chef: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const createChef = async (req: Request, res: Response) => {
    try {
        const { name, img, description, restaurants } = req.body;

        const newChef = await createChefHandler({ name, img, description, restaurants });

        res.status(201).json(newChef);
    } catch (error) {
        console.log("error create chef: ", (error as Error).message);
        res.status(500).json({ error: "Internal server error" });
    }
};
