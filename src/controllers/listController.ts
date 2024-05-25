import { Request, Response } from 'express';
import { addToList, removeFromList, listItems } from '../services';

export const addItem = async (req: Request, res: Response) => {
    const { userId, itemId, itemType } = req.body;
    try {
        await addToList(userId, itemId, itemType);
        res.status(200).send('Item added to list');
    } catch (error) {
        const err = error as Error;
        res.status(500).send(err.message);
    }
};

export const removeItem = async (req: Request, res: Response) => {
    const { userId, itemId } = req.body;
    try {
        await removeFromList(userId, itemId);
        res.status(200).send('Item removed from list');
    } catch (error) {
        const err = error as Error;
        res.status(500).send(err.message);
    }
};

export const getItems = async (req: Request, res: Response) => {
    const { userId, page, limit } = req.query;
    try {
        const items = await listItems(parseInt(userId as string), parseInt(page as string), parseInt(limit as string));
        res.status(200).json(items);
    } catch (error) {
        const err = error as Error;
        res.status(500).send(err.message);
    }
};
