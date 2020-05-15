import Airtable from "airtable";
import { point, Feature, Point } from "@turf/helpers";
import { getLocationMapboxApi } from "./mapbox";
import { PlaceFields } from "./schemas";

const AIRTABLE_API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.VUE_APP_AIRTABLE_BASE_ID;

// Airtable client
const base = new Airtable({
  apiKey: AIRTABLE_API_KEY
}).base(AIRTABLE_BASE_ID);

// Geocode and return [lat, lng]
const geocode = async (
  street: string,
  addressNumber: string,
  postcode: string
): Promise<number[] | void> => {
  // If no address, return void
  if (!street && !addressNumber) return;
  // Build address
  const address = `${street} ${addressNumber} ${postcode} Berlin`;
  const location = await getLocationMapboxApi(address);
  return location;
};

const geocodeAndFeaturiseRow = async (
  fields: PlaceFields
): Promise<Feature<Point, PlaceFields> | void> => {
  const { street, addressNumber, postcode } = fields;
  const location = await geocode(street, addressNumber, postcode);
  if (location) {
    return point(location, fields);
  }
  return;
};

export const getPlacesGeojson = async <PlaceFields>(): Promise<Feature<
  Point,
  PlaceFields
>[]> => {
  // Get results from the table
  // @ts-ignore
  const placesRows: { fields: PlaceFields }[] = await base("places")
    .select({ view: "Grid view" })
    .all();

  // Geocode results and return list of geojson features
  const geocodedPlaces = await Promise.all(
    // @ts-ignore TODO: Fix
    placesRows.map((row) => geocodeAndFeaturiseRow(row.fields))
  );

  // Only return places that have been geocoded
  const placesPoints = geocodedPlaces.filter((place) => place != undefined);

  return placesPoints as Feature<Point, PlaceFields>[];
};
