import { de } from "vuetify/src/locale";

export default {
  ...de,
  localeSelection: {
    language: "Sprache",
    german: "Deutsch",
    english: "English"
  },
  // Page title and description
  title: "Verdrängungskarte Neukölln",
  description: "",
  reportPlace:
    "Wenn Sie von einem Ort in Neukölln wissen, der geschlossen wurde oder dem die Räumung droht, melden Sie ihn hier",
  // Filters
  filters: {
    filterPlaceTypeTitle: "nach Ortsart filtern"
  },
  placeTypes: {
    bar: "Kneipe",
    cafe: "Café",
    clothingStore: "Kleiderladen",
    electronicsStore: "Handy-Shop",
    grocery: "Lebensmittel",
    restaurant: "Restaurant",
    repair: "Reparatur",
    other: "Anderes",
    communitySpace: "Gemeinschaftsraum",
    school: "Schüle",
    salon: "Salon"
  },
  placeStates: {
    closed: "geschlossen",
    facingEviction: "Räumungsklage",
    struggling: "bedroht"
  },
  placeCard: {
    moreInfoLink: "weitere Informationen"
  }
};
