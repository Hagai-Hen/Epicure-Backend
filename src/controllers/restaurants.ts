import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";

export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find({})

        if (!restaurants) return res.status(200).json([]) as any;
        res.status(200).json(restaurants);

    } catch (error) {
        console.log("error getting restaurants: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const getRestaurant = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.findById(id);

        if (!restaurant) return res.status(200).json([]) as any;
        res.status(200).json(restaurant);

    } catch (error) {
        console.log("error getting restaurant: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedRestaurant = await Restaurant.findOneAndUpdate({ _id: id }, updateData, { new: true });

        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' }) as any;
        }

        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.log("Error updating Restaurant: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' }) as any;
        }

        return res.status(200).json({
            message: 'Restaurant deleted successfully',
            restaurant: deletedRestaurant,
          });
    } catch (error) {
        console.log("Error deleting Restaurant: ", (error as Error).message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, img, chef, dishes } = req.body;

        if (!name) {
            return res.status(400).send({ error: 'Name is required' });
        } else if (!chef) {
            return res.status(400).send({ error: 'Chef is required' });
        }

        const newRestaurant = new Restaurant({
            name: name,
            img: img,
            chef: chef,
            dishes: dishes
        })

        if (!newRestaurant) {
            return res.status(400).send({ error: 'cannot create new Restaurant' }) as any;
        }

        await newRestaurant.save();

        res.status(201).json(newRestaurant) as any;
    } catch (error) {
        console.log("error create restaurant: ", (error as Error).message);
        res.status(400).json({ error: "Internal server error" });
    }
};
