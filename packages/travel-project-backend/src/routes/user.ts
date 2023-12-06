import express from "express";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken } from "../auth";
import bcrypt from "bcrypt";

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
        password: await bcrypt.hash(password, 10),
        token,
      },
    });
    res.json({ token: user.token, id: user.id });
  } catch (error) {
    console.log(error);
  }
});

// login
userRouter.put("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = await generateAccessToken(username);
    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    res.json({ token, id: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default userRouter;
