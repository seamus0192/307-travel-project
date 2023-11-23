import axios from "axios";
import type { Itinerary, Prisma } from "@prisma/client";

const getItineraries = async (userId: number): Promise<Itinerary[]> => {
  const { data } = await axios.get<Itinerary[]>(
    `${process.env.REACT_APP_API_URL}/itinerary/${userId}`,
  );

  return data;
};

const createItinerary = async (
  itinerary: Prisma.ItineraryCreateInput,
  userId: number,
): Promise<Itinerary> => {
  const { data } = await axios.post<Itinerary>(
    `${process.env.REACT_APP_API_URL}/itinerary/${userId}`,
    {
      name: itinerary.name,
    },
  );

  return data;
};

const updateItinerary = async (
  itinerary: Prisma.ItineraryUpdateInput,
  itineraryId: number,
): Promise<Itinerary> => {
  const { data } = await axios.put<Itinerary>(
    `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}`,
    {
      name: itinerary.name,
    },
  );

  return data;
};

const deleteItinerary = async (itineraryId: number): Promise<Itinerary> => {
  const { data } = await axios.delete<Itinerary>(
    `${process.env.REACT_APP_API_URL}/itinerary/${itineraryId}`,
  );

  return data;
};

export { getItineraries, createItinerary, updateItinerary, deleteItinerary };
