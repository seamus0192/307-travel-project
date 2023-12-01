import axios from "axios";
import { type Event, type Prisma } from "@prisma/client";

const getEvents = async (dayId: number): Promise<Event[]> => {
  const { data } = await axios.get<Event[]>(
    `${process.env.REACT_APP_API_URL}/event/${dayId}`,
  );

  return data;
};

const createEvent = async (
  event: Omit<Prisma.EventCreateInput, "day">,
  dayId: number,
): Promise<Event> => {
  const { data } = await axios.post<Event>(
    `${process.env.REACT_APP_API_URL}/event/${dayId}`,
    {
      name: event.name,
      startTime: event.startTime,
      endTime: event.endTime,
      cost: event.cost,
      link: event.link,
    },
  );

  return data;
};

const updateEvent = async (
  event: Prisma.EventUpdateInput,
  eventId: number,
): Promise<Event> => {
  const response = await axios.put<Event>(
    `${process.env.REACT_APP_API_URL}/event/${eventId}`,
    {
      name: event.name,
      startTime: event.startTime,
      endTime: event.endTime,
      cost: event.cost,
      link: event.link,
    },
  );

  return response.data;
};

const deleteEvent = async (eventId: number): Promise<Event> => {
  const { data } = await axios.delete<Event>(
    `${process.env.REACT_APP_API_URL}/event/${eventId}`,
  );

  return data;
};

export { getEvents, createEvent, updateEvent, deleteEvent };
