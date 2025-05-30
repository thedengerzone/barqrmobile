export interface AutocompleteResponse {
  predictions: Prediction[];
  status: string;
}

export interface Prediction {
  description: string;
  place_id: string;
}

export interface PlaceDetailsResponse {
  result: PlaceDetails;
  status: string;
}

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  geometry: Geometry;
  formatted_phone_number: string;
  website: string;
}

export interface Geometry {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}
