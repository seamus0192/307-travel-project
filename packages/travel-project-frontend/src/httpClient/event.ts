import axios from "axios";
import { type Prisma } from "@prisma/client";

const getEvents = async (dayId: number) => {
  const response = await axios.get(
    `travel-hub.azurewebsites.net/event/${dayId}`,
  );

  return response.data;
};

const createEvent = async (event: Prisma.EventCreateInput, dayId: number) => {
  const response = await axios.post(
    `travel-hub.azurewebsites.net/event/${dayId}`,
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

const updateEvent = async (event: Prisma.EventUpdateInput, eventId: number) => {
  const response = await axios.put(
    `travel-hub.azurewebsites.net/event/${eventId}`,
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

const deleteEvent = async (eventId: number) => {
  const response = await axios.delete(
    `travel-hub.azurewebsites.net/event/${eventId}`,
  );

  return response.data;
};

export { getEvents, createEvent, updateEvent, deleteEvent };
