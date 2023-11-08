import express from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = express.Router();
const prisma = new PrismaClient();

// signup
userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  res.json(user);
});

// login
userRouter.put("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username: username,
      password: password,
    },
  });

  res.json(user);
});

export default userRouter;
