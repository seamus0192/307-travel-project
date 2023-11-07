import axios from "axios";
import { Prisma } from "@prisma/client";

const getDays = async (itineraryId: number) => {
    const response = await axios.get(`http://localhost:8000/day/${itineraryId}`);

    return response.data;
}

const createDay = async (day: Prisma.DayCreateInput, itineraryId: number) => {
    const response = await axios.post(`http://localhost:8000/day/${itineraryId}`, {
        date: day.date,
    });

    return response.data;
}

const updateDay = async (day: Prisma.DayUpdateInput, dayId: number) => {
    const response = await axios.put(`http://localhost:8000/day/${dayId}`, {
        date: day.date,
    });

    return response.data;
}

const deleeteDay = async (dayId: number) => {
    const response = await axios.delete(`http://localhost:8000/day/${dayId}`);

    return response.data;
}

export { getDays, createDay, updateDay, deleeteDay }