import express from "express";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../auth";

const userRouter = express.Router();
const prisma = new PrismaClient();

// signup
userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await generateAccessToken(username);
    const user = await prisma.user.create({
      data: {
        username,
        password,
        token,
      },
    });
    res.json(user.token);
  } catch (error) {
    console.log(error);
  }
});

// login
userRouter.put("/", async (req, res) => {
  const { username, password } = req.body;
  try {
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
    res.json(user.token);
  } catch (error) {
    console.log(error);
  }
});

export default userRouter;
