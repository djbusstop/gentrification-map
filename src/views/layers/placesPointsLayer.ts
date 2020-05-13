import L from "leaflet";
import { FeatureCollection } from "@turf/helpers";

// Function that filters features by some property
export const placesPointsLayer = (places: FeatureCollection) => {
  // Style
  const style = () => {
    return {
      stroke: 2,
      fillColor: "black"
    };
  };

  // Create Leaflet Layer
  return L.geoJSON(places, {
    pointToLayer: function(point, latlng) {
      return L.circleMarker(latlng);
    },
    // @ts-ignore
    style: style
  });
};
