import express from "express";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../auth";

const userRouter = express.Router();
const prisma = new PrismaClient();

// signup
userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const token = await generateAccessToken(username);

  const user = await prisma.user.create({
    data: {
      username,
      password,
      token,
    },
  });

  res.json(user);
});

// login
userRouter.put("/", async (req, res) => {
  const { username, password } = req.body;

  await prisma.user.findUniqueOrThrow({
    where: {
      username,
      password,
    },
  });

  const token = await generateAccessToken(username);

  const user = await prisma.user.update({
    where: {
      username,
    },
    data: {
      token,
    },
  });

  res.json(user);
});

export default userRouter;
