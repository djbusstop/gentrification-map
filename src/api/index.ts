import Airtable from "airtable";
import {
  point,
  featureCollection,
  Feature,
  Point,
  FeatureCollection
} from "@turf/helpers";
import { getLocationMapboxApi } from "./mapbox";

const AIRTABLE_API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.VUE_APP_AIRTABLE_BASE_ID;

// Interface for the shapes of the Airtable results
interface PlaceFields {
  street: string;
  addressNumber: string;
  postcode: string;
}

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

const geocodeAndFeaturiseRow = async (place: {
  fields: PlaceFields;
}): Promise<Feature<Point, PlaceFields> | void> => {
  const { street, addressNumber, postcode } = place.fields;
  const location = await geocode(street, addressNumber, postcode);
  if (location) {
    return point(location, place.fields);
  }
  return;
};

/**
 * Returns a feature collection of the geocoded places in the closedPlaces table
 */
const getClosedPlacesGeojson = async (): Promise<FeatureCollection<Point>> => {
  // Get results from the table
  // @ts-ignore
  const closedPlacesRows: { fields: Place }[] = await base("closedPlaces")
    .select({ view: "Grid view" })
    .all();

  // Geocode results and return list of geojson features
  const geocodedClosedPlaces = await Promise.all(
    // For each result in the database
    closedPlacesRows.map((row) => geocodeAndFeaturiseRow(row))
  );

  // Only return places that have been geocoded
  const closedPlacesPoints = geocodedClosedPlaces.filter(
    (place) => place != undefined
  );

  // List of features to FeatureCollection
  const resultsFeatureCollection = featureCollection(
    closedPlacesPoints as Feature<Point, PlaceFields>[]
  );
  return resultsFeatureCollection;
};

export { getClosedPlacesGeojson };
