import Airtable from "airtable";
// @ts-ignore
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { point, featureCollection } from "@turf/helpers";

// API Key for Mapbox geocoding service
const MAPBOX_ACCESS_TOKEN = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
const AIRTABLE_API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY;
// The ID for the airtable database
const AIRTABLE_BASE_ID = process.env.VUE_APP_AIRTABLE_BASE_ID;

// Interface for the shapes of the Airtable results
interface Place {
  street: string;
  addressNumber: string;
  postcode: string;
}

// Mapbox client
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

// Airtable client
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Geolocate with Mapbox Api
const getLocationMapboxApi = async (address: string) => {
  // This function is probably super flaky
  const response = await geocodingClient
    .forwardGeocode({ query: address })
    .send();

  const { body } = response;
  // If no result
  if (!body.features || body.features.length == 0) {
    console.log(`Could not geocode address ${address}`);
  } else {
    // If result
    return response.body.features[0].center;
  }
  return;
};

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
