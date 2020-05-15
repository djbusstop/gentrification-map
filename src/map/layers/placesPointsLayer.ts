import L from "leaflet";
import { FeatureCollection, Feature, Point } from "@turf/helpers";

import { AnyPlaceFields } from "@/api/schemas";

import { PlaceTypeColor } from "../styles";

// Function that filters features by some property
export const placesPointsLayer = (places: FeatureCollection) => {
  // Style
  const style = ({ properties }: Feature<Point, AnyPlaceFields>) => {
    const { placeType } = properties;
    return {
      stroke: properties.table === "closedPlaces" ? 0 : 2,
      color: properties.table === "closedPlaces" ? null : "#a80000",
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
