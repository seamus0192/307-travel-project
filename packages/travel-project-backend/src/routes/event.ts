import express from "express";
import { PrismaClient } from "@prisma/client";

const eventRouter = express.Router();
const prisma = new PrismaClient();

eventRouter.get("/:dayId", async (req, res) => {
  const { dayId } = req.params;

  const events = await prisma.event.findMany({
    where: {
      dayId: parseInt(dayId),
    },
  });

  res.json(events);
});

eventRouter.post("/:dayId", async (req, res) => {
  const { dayId } = req.params;
  const { name, startTime, endTime, cost, link } = req.body;

  const newEvent = await prisma.event.create({
    data: {
      name,
      startTime,
      endTime,
      cost,
      link,
      dayId: parseInt(dayId),
    },
  });

  res.json(newEvent);
});

eventRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, startTime, endTime, cost, link } = req.body;

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
});

eventRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await prisma.event.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.json(deletedEvent);
});

export default eventRouter;
