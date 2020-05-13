// @ts-ignore
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const MAPBOX_ACCESS_TOKEN = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_ACCESS_TOKEN });

interface MapboxGeocodeResponse {
  body: {
    features: Array<{
      center: number[];
    }>;
  };
}

// Geolocate with Mapbox Api
export const getLocationMapboxApi = async (
  address: string
): Promise<number[] | void> => {
  // This function is probably super flaky
  const response = await geocodingClient
    .forwardGeocode({ query: address })
    .send();

  const { body } = response as MapboxGeocodeResponse;
  // If no result
  if (body.features && body.features.length > 0) {
    return response.body.features[0].center;
  }
  console.log(`Could not geocode address ${address}`);
  return;
};
