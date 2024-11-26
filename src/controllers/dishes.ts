import { Request, Response } from "express";
import Dish from "../models/Dish";

export const getAllDishes = async (req: Request, res: Response) => {
    try {
        const dishes = await Dish.find({})

        if (!dishes) return res.status(200).json([]) as any;
        res.status(200).json(dishes);

    } catch (error) {
        console.log("error getting dishes: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const getDish = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const dish = await Dish.findById(id);

        if (!dish) return res.status(200).json([]) as any;
        res.status(200).json(dish);

    } catch (error) {
        console.log("error getting dish: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const updateDish = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const dish = await Dish.findById(id);

        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' }) as any;
        }

        if (updateData.tags) {
            updateData.tags = updateData.tags.map((tag: string) => tag.toLowerCase());
            const invalidTags = updateData.tags.filter((tag: string) => !['spicy', 'vegan', 'vegetarian'].includes(tag));
            if (invalidTags.length > 0) {
                return res.status(400).send({ error: `Invalid tag(s): ${invalidTags.join(', ')}` });
            }
            
            updateData.tags = [... new Set(updateData.tags)]
        }

        const updatedDish = await Dish.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedDish);
    } catch (error) {
        console.log("Error updating Dish: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const deleteDish = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedDish = await Dish.findByIdAndDelete(id);

        if (!deletedDish) {
            return res.status(404).json({ message: 'Dish not found' }) as any;
        }

        return res.status(200).json({
            message: 'Dish deleted successfully',
            dish: deletedDish,
          });
    } catch (error) {
        console.log("Error deleting dish: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const createDish = async (req: Request, res: Response) => {
    try {
        const { name, price, ingredients, tags, restaurant } = req.body;

        if (!name) {
            return res.status(400).send({ error: 'name is required' });
        } else if (!price && price > 0) {
            return res.status(400).send({ error: 'price suppose to be valid number' });
        } else if (!ingredients) {
            return res.status(400).send({ error: 'ingredients is required' });
        } if (!restaurant) {
            return res.status(400).send({ error: 'restaurant is required' });
        }

        let newTags;

        if (tags) {
            newTags = tags.map((tag: string) => tag.toLowerCase());
            const invalidTags = newTags.filter((tag: string) => !['spicy', 'vegan', 'vegetarian'].includes(tag));
            if (invalidTags.length > 0) {
                return res.status(400).send({ error: `Invalid tag(s): ${invalidTags.join(', ')}` });
            }

            newTags = [... new Set(newTags)]
        }

        const newDish = new Dish({
            name: name,
            price: price,
            ingredients: ingredients,
            tags: newTags,
            restaurant: restaurant,
        })

        if (!newDish) {
            return res.status(400).send({ error: 'cannot create new dish' }) as any;
        }

        await newDish.save();

        res.status(201).json(newDish) as any;
    } catch (error) {
        console.log("error create dish: ", (error as Error).message);
        res.status(400).json({ error: "Internal server error" });
    }
};
