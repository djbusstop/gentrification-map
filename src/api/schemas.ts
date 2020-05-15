/**
 * Schemas that align with Airtable databases.
 * When changing The Airtable schemas, these must be updated.
 */

export type TableName = "closedPlaces" | "facingEvictionPlaces";

export type PlaceType =
  | "bar"
  | "cafe"
  | "clothingStore"
  | "electronicsStore"
  | "grocery"
  | "restaurant"
  | "repair"
  | "other"
  | "communitySpace"
  | "school"
  | "salon";

export interface PlaceFields {
  table: string;
  id: string;
  name: string;
  placeType: PlaceType;
  placeTypeIfOther: string;
  isChain: boolean;
  street: string;
  addressNumber: string;
  postcode: string;
}

export interface ClosedPlaceFields extends PlaceFields {
  noticedDate: Date;
}

export interface FacingEvictionPlaceFields extends PlaceFields {
  link?: string;
  moreInfo?: string;
  date?: string;
}

export type AnyPlaceFields = ClosedPlaceFields | FacingEvictionPlaceFields;
