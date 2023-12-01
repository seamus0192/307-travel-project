import express from "express";
import { PrismaClient } from "@prisma/client";
import { authorizeRequest } from "../auth";

const dayRouter = express.Router();
dayRouter.use(authorizeRequest);
const prisma = new PrismaClient();

dayRouter.get("/:itineraryId", async (req, res) => {
  const { itineraryId } = req.params;
  try {
    const days = await prisma.day.findMany({
      where: {
        itineraryId: parseInt(itineraryId),
      },
    });
    res.json(days);
  } catch (error) {
    console.log(error);
  }
});

dayRouter.post("/:itineraryId", async (req, res) => {
  const { itineraryId } = req.params;
  const { date, icon } = req.body;
  try {
    const newDay = await prisma.day.create({
      data: {
        date,
        icon,
        itinerary: {
          connect: {
            id: parseInt(itineraryId),
          },
        },
      },
    });
    res.json(newDay);
  } catch (error) {
    console.log(error);
  }
});

dayRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, icon } = req.body;
  try {
    const updatedDay = await prisma.day.update({
      where: {
        id: parseInt(id),
      },
      data: {
        date,
        icon,
      },
    });
    res.json(updatedDay);
  } catch (error) {
    console.log(error);
  }
});

dayRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDay = await prisma.day.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedDay);
  } catch (error) {
    console.log(error);
  }
});

export default dayRouter;
