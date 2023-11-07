import axios from 'axios';
import { Prisma } from '@prisma/client';

const getItineraries = async (userId: number) => {
    const response = await axios.get(`http://localhost:8000/itinerary/${userId}`);

    return response.data;
}

const createItinerary = async (itinerary: Prisma.ItineraryCreateInput, userId: number) => {
    const response = await axios.post(`http://localhost:8000/itinerary/${userId}`, {
        name: itinerary.name,
    });

    return response.data;
}

const updateItinerary = async (itinerary: Prisma.ItineraryUpdateInput, itineraryId: number) => {
    const response = await axios.put(`http://localhost:8000/itinerary/${itineraryId}`, {
        name: itinerary.name,
    });

    return response.data;
}

const deleteItinerary = async (itineraryId: number) => {
    const response = await axios.delete(`http://localhost:8000/itinerary/${itineraryId}`);

    return response.data;
}

export { getItineraries, createItinerary, updateItinerary, deleteItinerary }