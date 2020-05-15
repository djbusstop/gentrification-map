import L from "leaflet";
import { FeatureCollection, Feature, Point } from "@turf/helpers";

import { PlaceFields } from "@/api/schemas";

import { PlaceTypeColor } from "../styles";

// Function that filters features by some property
export const placesPointsLayer = (places: FeatureCollection) => {
  // Style
  const style = ({ properties }: Feature<Point, PlaceFields>) => {
    const { placeType } = properties;
    return {
      stroke: 0,
      fillColor: PlaceTypeColor[placeType],
      fillOpacity: 0.85
    };
  };

  // Create Leaflet Layer
  const layer = L.geoJSON(places, {
    pointToLayer: function(point, latlng) {
      return L.circleMarker(latlng, {
        radius: 12,
        interactive: true
      }).bindPopup(point.properties.name, { closeButton: false });
    },
    // @ts-ignore
    style
  });
  return layer;
};
