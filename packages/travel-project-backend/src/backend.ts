import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 8000;

const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.put('/users/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            username: username,
            password: password
        }
    });

    res.json(user);
});

app.post('/users/signup', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });

    res.json(user);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});