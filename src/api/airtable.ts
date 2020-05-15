import Airtable from "airtable";
import { point, Feature, Point } from "@turf/helpers";
import { getLocationMapboxApi } from "./mapbox";
import {
  TableName,
  AnyPlaceFields,
  ClosedPlaceFields,
  FacingEvictionPlaceFields
} from "./schemas";

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
  fields: AnyPlaceFields
): Promise<Feature<Point, AnyPlaceFields> | void> => {
  const { street, addressNumber, postcode } = fields;
  const location = await geocode(street, addressNumber, postcode);
  if (location) {
    return point(location, fields);
  }
  return;
};

/**
 * Pass the table name in the airtable to get all rows and then geocode them
 * by the fields: "street", "addressNumber", "postcode".
 *
 * Pass the type to the function of the expected properties in each feature
 * @param tableName
 */
const getPlacesFromTableGeojson = async <AnyPlaceFields>(
  tableName: TableName
): Promise<Feature<Point, AnyPlaceFields>[]> => {
  // Get results from the table
  // @ts-ignore
  const placesRows: { fields: AnyPlaceFields }[] = await base(tableName)
    .select({ view: "Grid view" })
    .all();

  // Geocode results and return list of geojson features
  const geocodedPlaces = await Promise.all(
    // @ts-ignore TODO: Fix
    placesRows.map((row) => geocodeAndFeaturiseRow(row.fields))
  );

  // Only return places that have been geocoded
  const placesPoints = geocodedPlaces.filter((place) => place != undefined);

  return placesPoints as Feature<Point, AnyPlaceFields>[];
};

export const getClosedPlacesGeojson = async (): Promise<Feature<
  Point,
  ClosedPlaceFields
>[]> => {
  return await getPlacesFromTableGeojson<ClosedPlaceFields>("closedPlaces");
};

export const getFacingEvictionPlacesGeojson = async (): Promise<Feature<
  Point,
  FacingEvictionPlaceFields
>[]> => {
  return await getPlacesFromTableGeojson<FacingEvictionPlaceFields>(
    "facingEvictionPlaces"
  );
};
