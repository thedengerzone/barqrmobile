export interface AutocompleteResponse {
  predictions: Prediction[];
  status: string;
}

export interface Prediction {
  description: string;
  placeId: string;
}

export interface PlaceDetailsResponse {
  result: PlaceDetails;
  status: string;
}

export interface PlaceDetails {
  name: string;
  formattedAddress: string;
  geometry: Geometry;
  formattedPhoneNumber: string;
  website: string;
}

export interface Geometry {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
