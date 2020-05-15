import L from "leaflet";
import { FeatureCollection, Feature, Point } from "@turf/helpers";

import { PlaceFields } from "@/api/schemas";

import { PlaceTypeColor, closedColor, facingEvictionColor } from "../styles";

// Function that filters features by some property
export const placesPointsLayer = (places: FeatureCollection) => {
  // Style
  const style = ({ properties }: Feature<Point, PlaceFields>) => {
    const { placeType } = properties;
    return {
      stroke: 2,
      opacity: 0.85,
      color:
        // The stroke of closed places is black, facing evictions is red
        properties.placeState === "closed" ? closedColor : facingEvictionColor,
      fillColor: PlaceTypeColor[placeType],
      fillOpacity: 0.75
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
