import Airtable from "airtable";
// @ts-ignore
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { feature, featureCollection } from "@turf/helpers";

interface ClosedPlace {
  street: string;
  addressNumber: string;
  postcode: string;
}

// Mapbox client
const MAPBOX_ACCESS_TOKEN = `sk.eyJ1IjoiZ29vZC1mcmllbmQiLCJhIjoiY2thMzI5azRzMGc4YjNkb2dlaHRvOXBrayJ9.UIEcdmZ6UGUtIZEKSJv91Q`;
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

// Airtable client
const base = new Airtable({ apiKey: "keywDXl3PxV5EEGAC" }).base(
  "appaEed7sWm3CZIwH"
);

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
const geocode = async (closedPlace: ClosedPlace) => {
  // Build address
  const address = `${closedPlace.street} ${closedPlace.addressNumber} ${closedPlace.postcode} Berlin`;

  // Await response
  const location = await getLocationMapboxApi(address);
  console.log(location);
  // Create feature
  return feature(location, closedPlace);
};

const getClosedPlacesGeojson = async () => {
  // Get results from the table
  // @ts-ignore
  const results: { fields: ClosedPlace }[] = await base("Table 1")
    .select({ view: "Grid view" })
    .all();

  // Clean response to only include db rows
  const resultsObjects: ClosedPlace[] = results.map((item) => item.fields);

  // Geocode results and return list of geojson features
  const resultsFeatureList = await Promise.all(
    resultsObjects.map((closedPlace) => geocode(closedPlace))
  );

  // List of features to FeatureCollection
  const resultsFeatureCollection = featureCollection(resultsFeatureList);

  return resultsFeatureCollection;
};

export { getClosedPlacesGeojson };
