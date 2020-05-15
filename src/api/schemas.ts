/**
 * Schemas that align with Airtable databases.
 * When changing The Airtable schemas, these must be updated.
 */

export type PlaceState = "closed" | "facingEviction";

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
  id: string;
  name: string;
  placeState: PlaceState;
  placeType: PlaceType;
  placeTypeIfOther: string;
  isChain: boolean;
  link: string;
  moreInfoText: string;
  street: string;
  addressNumber: string;
  postcode: string;
  city: string;
}
