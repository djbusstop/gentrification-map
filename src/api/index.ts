import Airtable from "airtable";
import { point, featureCollection } from "@turf/helpers";
import { getLocationMapboxApi } from "./mapbox";

const AIRTABLE_API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.VUE_APP_AIRTABLE_BASE_ID;

// Interface for the shapes of the Airtable results
interface Place {
  street: string;
  addressNumber: string;
  postcode: string;
}

// Airtable client
const base = new Airtable({
  apiKey: AIRTABLE_API_KEY
}).base(AIRTABLE_BASE_ID);

// Function to pass to promise resolver for geocoding
const geocode = async (closedPlace: Place) => {
  // Build address
  const address = `${closedPlace.street} ${closedPlace.addressNumber} ${closedPlace.postcode} Berlin`;

  // Await response
  const location = await getLocationMapboxApi(address);
  // Create feature
  return point(location, closedPlace);
};

/**
 * Returns a feature collection of the geocoded places in the closedPlaces table
 */
const getClosedPlacesGeojson = async () => {
  // Get results from the table
  // @ts-ignore
  const results: { fields: Place }[] = await base("closedPlaces")
    .select({ view: "Grid view" })
    .all();

  // Clean response to only include db rows
  const resultsObjects: Place[] = results.map((item) => item.fields);

  // Geocode results and return list of geojson features
  const resultsFeatureList = await Promise.all(
    resultsObjects.map((closedPlace) => geocode(closedPlace))
  );

  // List of features to FeatureCollection
  const resultsFeatureCollection = featureCollection(resultsFeatureList);
  return resultsFeatureCollection;
};

export { getClosedPlacesGeojson };
