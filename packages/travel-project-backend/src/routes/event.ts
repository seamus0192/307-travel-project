import express from "express";
import { PrismaClient } from "@prisma/client";
import { authorizeRequest } from "../auth";

const eventRouter = express.Router();
eventRouter.use(authorizeRequest);
const prisma = new PrismaClient();

eventRouter.get("/:dayId", async (req, res) => {
  const { dayId } = req.params;
  try {
    const events = await prisma.event.findMany({
      where: {
        dayId: parseInt(dayId),
      },
    });
    res.json(events);
  } catch (error) {
    console.log(error);
  }
});

eventRouter.post("/:dayId", async (req, res) => {
  const { dayId } = req.params;
  const { name, startTime, endTime, cost, link } = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: {
        name,
        startTime,
        endTime,
        cost,
        link,
        day: {
          connect: {
            id: parseInt(dayId),
          },
        },
      },
    });
    res.json(newEvent);
  } catch (error) {
    console.log(error);
  }
});

eventRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, startTime, endTime, cost, link } = req.body;
  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        startTime,
        endTime,
        cost,
        link,
      },
    });
    res.json(updatedEvent);
  } catch (error) {
    console.log(error);
  }
});

eventRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedEvent);
  } catch (error) {
    console.log(error);
  }
});

export default eventRouter;
