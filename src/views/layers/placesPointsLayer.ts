import L from "leaflet";
import { FeatureCollection, Feature, Point } from "@turf/helpers";

import { PlaceFields, PlaceType } from "@/api/airtable";

enum PlaceTypeColor {
  bar = "",
  cafe = "teal",
  clothingStore = "mediumblue",
  electronicsStore = "",
  grocery = "deeppink",
  restaurant = "coral",
  repair = "forestgreen",
  other = "",
  communitySpace = "",
  school = "",
  salon = ""
}

// Function that filters features by some property
export const placesPointsLayer = (places: FeatureCollection) => {
  // Style
  const style = ({ properties }: Feature<Point, PlaceFields>) => {
    const { placeType } = properties;
    console.log(placeType);
    return {
      stroke: 0,
      fillColor: PlaceTypeColor[placeType],
      fillOpacity: 0.75
    };
  };

  // Create Leaflet Layer
  return L.geoJSON(places, {
    pointToLayer: function(point, latlng) {
      return L.circleMarker(latlng, { radius: 12 });
    },
    // @ts-ignore
    style: style
  });
};
