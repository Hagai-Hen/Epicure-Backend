import { Request, Response } from "express";
import Chef from "../models/Chef";

export const getAllChefs = async (req: Request, res: Response) => {
    try {
        const Chefs = await Chef.find({})

        if (!Chefs) return res.status(200).json([]) as any;
        res.status(200).json(Chefs);

    } catch (error) {
        console.log("error getting Chefs: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const getChef = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const chef = await Chef.findById(id);

        if (!chef) return res.status(200).json([]) as any;
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
        const updatedChef = await Chef.findByIdAndUpdate({ _id: id }, updateData, { new: true });

        if (!updatedChef) {
            return res.status(404).json({ message: 'Chef not found' }) as any;
        }

        res.status(200).json(updatedChef);
    } catch (error) {
        console.log("Error updating chef: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const deleteChef = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedChef = await Chef.findByIdAndDelete(id);

        if (!deletedChef) {
            return res.status(404).json({ message: 'Chef not found' }) as any;
        }

        return res.status(200).json({
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

        if (!name) {
            return res.status(400).send({ error: 'name is required' });
        } else if (!description) {
            return res.status(400).send({ error: 'description is required' });
        }

        const newChef = new Chef({
            name: name,
            img: img,
            description: description,
            restaurants: restaurants,
        })

        if (!newChef) {
            return res.status(400).send({ error: 'cannot create new chef' }) as any;
        }

        await newChef.save();

        res.status(201).json(newChef) as any;
    } catch (error) {
        console.log("error create chef: ", (error as Error).message);
        res.status(400).json({ error: "Internal server error" });
    }
};
