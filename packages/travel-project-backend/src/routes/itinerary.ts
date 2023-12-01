import express from "express";
import { PrismaClient } from "@prisma/client";
import { authorizeRequest } from "../auth";

const itineraryRouter = express.Router();
itineraryRouter.use(authorizeRequest);
const prisma = new PrismaClient();

itineraryRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const itineraries = await prisma.itinerary.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    res.json(itineraries);
  } catch (error) {
    console.log(error);
  }
});

itineraryRouter.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, icon, startDate, endDate, travelerCount } = req.body;
  try {
    const newItinerary = await prisma.itinerary.create({
      data: {
        name,
        icon,
        startDate,
        endDate,
        travelerCount,
        user: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
    });
    res.json(newItinerary);
  } catch (error) {
    console.log(error);
  }
});

itineraryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, icon, startDate, endDate, travelerCount } = req.body;
  try {
    const updatedItinerary = await prisma.itinerary.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        icon,
        startDate,
        endDate,
        travelerCount,
      },
    });
    res.json(updatedItinerary);
  } catch (error) {
    console.log(error);
  }
});

itineraryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItinerary = await prisma.itinerary.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedItinerary);
  } catch (error) {
    console.log(error);
  }
});

export default itineraryRouter;
