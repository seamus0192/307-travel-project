import axios from "axios";
import { Prisma } from "@prisma/client";

const getEvents = async (dayId: number) => {
    const response = await axios.get(`http://localhost:8000/event/${dayId}`);

    return response.data;
}

const createEvent = async (event: Prisma.EventCreateInput, dayId: number) => {
    const response = await axios.post(`http://localhost:8000/event/${dayId}`, {
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        cost: event.cost,
        link: event.link,
    });

    return response.data;
}

const updateEvent = async (event: Prisma.EventUpdateInput, eventId: number) => {
    const response = await axios.put(`http://localhost:8000/event/${eventId}`, {
        name: event.name,
        startTime: event.startTime,
        endTime: event.endTime,
        cost: event.cost,
        link: event.link,
    });

    return response.data;
}

const deleteEvent = async (eventId: number) => {
    const response = await axios.delete(`http://localhost:8000/event/${eventId}`);

    return response.data;
}

export { getEvents, createEvent, updateEvent, deleteEvent }