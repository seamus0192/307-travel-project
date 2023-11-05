import express from 'express';
import { PrismaClient } from '@prisma/client';

const dayRouter = express.Router();
const prisma = new PrismaClient();

dayRouter.get('/:itineraryId', async (req, res) => {
    const { itineraryId } = req.params;

    const days = await prisma.day.findMany({
        where: {
            itineraryId: parseInt(itineraryId)
        }
    });

    res.json(days);
});

dayRouter.post('/:itineraryId', async (req, res) => {
    const { itineraryId } = req.params;
    const { date } = req.body;

    const newDay = await prisma.day.create({
        data: {
            date: date,
            itineraryId: parseInt(itineraryId)
        }
    });

    res.json(newDay);
});

dayRouter.put('/:id', async (req, res) => {
    const { date, id } = req.body;

    const updatedDay = await prisma.day.update({
        where: {
            id: parseInt(id)
        },
        data: {
            date: date,
        }
    });

    res.json(updatedDay);
});

dayRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const deletedDay = await prisma.day.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json(deletedDay);
});

export default dayRouter;