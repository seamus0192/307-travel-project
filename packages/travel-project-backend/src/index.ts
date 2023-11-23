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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/itinerary", itineraryRouter);
app.use("/day", dayRouter);
app.use("/event", eventRouter);

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening on http://localhost:8000");
});
