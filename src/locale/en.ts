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
  reportPlace:
    "If you know of a place that closed or is facing eviction in Neukölln, report it here.",
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
  placeStates: {
    closed: "Closed",
    facingEviction: "Facing Eviction",
    struggling: "Struggling"
  }
};
