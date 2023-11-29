import express from "express";
import { PrismaClient } from "@prisma/client";
import { authorizeRequest } from "../auth";

const itineraryRouter = express.Router();
itineraryRouter.use(authorizeRequest);
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
  const { name, icon } = req.body;

  const newItinerary = await prisma.itinerary.create({
    data: {
      name,
      userId: parseInt(userId),
      icon,
    },
  });

  res.json(newItinerary);
});

itineraryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;

  const updatedItinerary = await prisma.itinerary.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      icon,
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
