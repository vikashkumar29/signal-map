export interface MarkerData extends LatLng {
  category: 'weak' | 'noSignal';
  comment?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Address {
  displayName: string;
  lat: number;
  lng: number;
}

export interface FeedbackData {
  comment?: string;
  category: 'weak' | 'noSignal';
}

export interface Feature {
  geometry: Point;
  properties: FeatureInfo;
}

export interface Point {
  coordinates: number[];
}

export interface FeatureInfo {
  osm_id: number;
  extent: number[];
  country: string;
  city: string;
  countrycode: string;
  postcode: string;
  locality: string;
  type: string;
  osm_type: string;
  osm_key: string;
  housenumber: string;
  street: string;
  district: string;
  osm_value: string;
  name: string;
  state: string;
}

export interface HTTPError {
  name: string;
  message: string;
  status: number;
}
