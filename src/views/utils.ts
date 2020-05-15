import { Feature, Point } from "@turf/helpers";
import { PlaceFields, PlaceType } from "@/api/schemas";
import { PlaceTypeColor } from "@/map/styles";

interface FilterOption {
  key: PlaceType;
  color: PlaceTypeColor;
}

/**
 * Get unique filters from a list of filter objects
 */
export const uniqueFilters = (filters: FilterOption[]): FilterOption[] => {
  return filters.reduce((acc: FilterOption[], filterOption: FilterOption) => {
    // Return boolean if item in acc
    const exists = acc.reduce((accAcc: boolean, accItem: FilterOption) => {
      if (accItem.key === filterOption.key) {
        return true;
      }
      return accAcc;
    }, false);
    // If item not in acc
    if (!exists) {
      return [...acc, filterOption];
    }
    // If item in acc
    return acc;
  }, []);
};

/**
 * Returns an object which is passed to the filter component as the
 * options to display
 */
export const typeFilterOptionsFromPlaces = (
  places: Feature<Point, PlaceFields>[]
): FilterOption[] => {
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
