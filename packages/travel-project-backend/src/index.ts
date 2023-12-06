import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import eventRouter from "./routes/event";
import dayRouter from "./routes/day";
import itineraryRouter from "./routes/itinerary";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/itinerary", itineraryRouter);
app.use("/day", dayRouter);
app.use("/event", eventRouter);

app.listen(port, () => {
  console.log(`REST API is listening on ${port}`);
});
