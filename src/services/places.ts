import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {AutocompleteResponse, PlaceDetailsResponse} from "../interface/places.ts";

export const placesService = {
  async searchPlaces(place: string): Promise<AutocompleteResponse> {
    try {
      const response: ResponseEntity<AutocompleteResponse> = await api.post('/places', {place: place});

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async searchPlaceDetails(placeId: string): Promise<PlaceDetailsResponse> {
    try {
      const response: ResponseEntity<PlaceDetailsResponse> = await api.post('/places/details', {placeId: placeId});

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};