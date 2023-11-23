import axios from "axios";
import { type Prisma } from "@prisma/client";

const getDays = async (itineraryId: number) => {
  const response = await axios.get(
    `travel-hub.azurewebsites.net/day/${itineraryId}`,
  );

  return response.data;
};

const createDay = async (day: Prisma.DayCreateInput, itineraryId: number) => {
  const response = await axios.post(
    `travel-hub.azurewebsites.net/day/${itineraryId}`,
    {
      date: day.date,
    },
  );

  return response.data;
};

const updateDay = async (day: Prisma.DayUpdateInput, dayId: number) => {
  const response = await axios.put(
    `travel-hub.azurewebsites.net/day/${dayId}`,
    {
      date: day.date,
    },
  );

  return response.data;
};

const deleeteDay = async (dayId: number) => {
  const response = await axios.delete(
    `travel-hub.azurewebsites.net/day/${dayId}`,
  );

  return response.data;
};

export { getDays, createDay, updateDay, deleeteDay };
