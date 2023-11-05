import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import eventRouter from "./routes/event";
import dayRouter from "./routes/day";
import itineraryRouter from "./routes/itinerary";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRouter)
app.use('/itineraries', itineraryRouter);
app.use('/days', dayRouter);
app.use('/events', eventRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});