import { en } from "vuetify/src/locale";

export default {
  ...en,
  localeSelection: {
    language: "Language",
    german: "German",
    english: "English"
  },
  // Page title and discriptions
  title: "Gentrification Map Neukölln",
  description:
    "Mapping the closures of spaces that use of commercial property in Neukölln. By tracking what places have closed, and what those places are doing, we can see what changes are taking places in the neighbourhood.",
  reportClosedPlace:
    "If you noticed a place has closed in Neukölln, report it here.",
  reportOpenedPlace:
    "If you noticed a place has closed in Neukölln, report it here.",
  reportPlaceFacingEviction:
    "If you know of a place facing eviction, report it here.",
  filters: {
    filterPlaceTypeTitle: "Filter place type"
  },
  placeTypes: {
    bar: "Bar",
    cafe: "Café",
    clothingStore: "Clothing Store",
    electronicsStore: "Electronics Shop",
    grocery: "Grocery",
    restaurant: "Restaurant",
    repair: "Repair",
    other: "Other",
    communitySpace: "Community Space",
    school: "School",
    salon: "Salon"
  },
  closed: "Closed",
  facingEviction: "Facing Eviction"
};
