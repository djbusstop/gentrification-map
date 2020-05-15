import { en } from "vuetify/src/locale";

export default {
  ...en,
  localeSelection: {
    language: "Language",
    german: "Deutsch",
    english: "English"
  },
  // Page title and discriptions
  title: "Displacement Map Neukölln",
  description:
    "Mapping the displacement of spaces that make up Neukölln's streetscape.",
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
  },
  placeCard: {
    moreInfoLink: "More information"
  }
};
