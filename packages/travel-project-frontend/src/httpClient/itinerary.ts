import axios from 'axios'
import type { Prisma } from '@prisma/client'

const getItineraries = async (userId: number): Promise<any> => {
  const response = await axios.get(`travel-hub.azurewebsites.net/itinerary/${userId}`)

  return response.data
}

const createItinerary = async (itinerary: Prisma.ItineraryCreateInput, userId: number): Promise<any> => {
  const response = await axios.post(`travel-hub.azurewebsites.net/itinerary/${userId}`, {
    name: itinerary.name
  })

  return response.data
}

const updateItinerary = async (itinerary: Prisma.ItineraryUpdateInput, itineraryId: number): Promise<any> => {
  const response = await axios.put(`travel-hub.azurewebsites.net/itinerary/${itineraryId}`, {
    name: itinerary.name
  })

  return response.data
}

const deleteItinerary = async (itineraryId: number): Promise<any> => {
  const response = await axios.delete(`travel-hub.azurewebsites.net/itinerary/${itineraryId}`)

  return response.data
}

export { getItineraries, createItinerary, updateItinerary, deleteItinerary }
