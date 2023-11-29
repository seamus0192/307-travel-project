import axios from "axios";
import { type Day, type Prisma } from "@prisma/client";

const getDays = async (itineraryId: number): Promise<Day[]> => {
  const { data } = await axios.get<Day[]>(
    `${process.env.REACT_APP_API_URL}/day/${itineraryId}`,
  );

  return data;
};

const createDay = async (
  day: Prisma.DayCreateInput,
  itineraryId: number,
): Promise<Day> => {
  const { data } = await axios.post<Day>(
    `${process.env.REACT_APP_API_URL}/day/${itineraryId}`,
    {
      date: day.date,
      icon: day.icon,
    },
  );

  return data;
};

const updateDay = async (
  day: Prisma.DayUpdateInput,
  dayId: number,
): Promise<Day> => {
  const { data } = await axios.put<Day>(
    `${process.env.REACT_APP_API_URL}/day/${dayId}`,
    {
      date: day.date,
      icon: day.icon,
    },
  );

  return data;
};

const deleteDay = async (dayId: number): Promise<Day> => {
  const { data } = await axios.delete<Day>(
    `${process.env.REACT_APP_API_URL}/day/${dayId}`,
  );

  return data;
};

export { getDays, createDay, updateDay, deleteDay };
