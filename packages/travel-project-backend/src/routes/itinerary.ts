import express from "express";
import { PrismaClient } from "@prisma/client";

const itineraryRouter = express.Router();
const prisma = new PrismaClient();

itineraryRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const itineraries = await prisma.itinerary.findMany({
    where: {
      userId: parseInt(userId),
    },
  });

  res.json(itineraries);
});

itineraryRouter.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const newItinerary = await prisma.itinerary.create({
    data: {
      name: name,
      userId: parseInt(userId),
    },
  });

  res.json(newItinerary);
});

itineraryRouter.put("/:id", async (req, res) => {
  const { name, id } = req.body;

  const updatedItinerary = await prisma.itinerary.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  res.json(updatedItinerary);
});

itineraryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedItinerary = await prisma.itinerary.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.json(deletedItinerary);
});

export default itineraryRouter;
