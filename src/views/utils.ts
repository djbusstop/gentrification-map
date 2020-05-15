import { Feature, Point } from "@turf/helpers";
import { PlaceFields, PlaceType } from "@/api/schemas";
import { PlaceTypeColor } from "@/map/styles";

/**
 * Returns an object which is passed to the filter component as the
 * options to display
 */
export const typeFilterOptionsFromPlaces = (
  places: Feature<Point, PlaceFields>[]
): { key: PlaceType; color: PlaceTypeColor }[] => {
  // Get unique values of closedPlaces placeTypes
  const availableTypes = places.reduce(
    (acc: string[], place: Feature<Point, PlaceFields>) => {
      // If place type already in list
      if (acc.includes(place.properties.placeType)) {
        return acc;
      }
      return [place.properties.placeType, ...acc];
    },
    []
  );
  // Map the unique types to the config
  const availableTypesObjects = availableTypes.map((type) => {
    return {
      key: type as PlaceType,
      color: PlaceTypeColor[type as PlaceType]
    };
  });
  return availableTypesObjects;
};
