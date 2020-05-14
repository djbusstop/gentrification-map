import L from "leaflet";
import { FeatureCollection, Feature, Point } from "@turf/helpers";

import { PlaceFields, PlaceType } from "@/api/airtable";

export enum PlaceTypeColor {
  bar = "yellow",
  cafe = "teal",
  clothingStore = "mediumblue",
  electronicsStore = "purple",
  grocery = "deeppink",
  restaurant = "coral",
  repair = "forestgreen",
  other = "tomato",
  communitySpace = "black",
  school = "organge",
  salon = "blue"
}

// Function that filters features by some property
export const placesPointsLayer = (places: FeatureCollection) => {
  // Style
  const style = ({ properties }: Feature<Point, PlaceFields>) => {
    const { placeType } = properties;
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
