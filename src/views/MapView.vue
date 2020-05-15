<template>
  <div class="map-view-grid">
    <!-- Sidebar -->
    <v-container class="content">
      <v-app-bar color="transparent" flat>
        <v-spacer />
        <v-btn
          icon
          href="https://github.com/datadrivenpropaganda/gentrification-map/blob/master/README.md"
          target="_blank"
        >
          <v-icon>code</v-icon>
        </v-btn>
        <locale-selector />
      </v-app-bar>

      <h1>{{ $vuetify.lang.t("$vuetify.title") }}</h1>
      <p>{{ $vuetify.lang.t("$vuetify.description") }}</p>

      <a target="_blank" :href="localisedFormLink">{{ $vuetify.lang.t("$vuetify.reportPlace") }}</a>

      <h2 class="mt-5">{{ $vuetify.lang.t("$vuetify.filters.filterPlaceTypeTitle") }}</h2>
      <places-type-filter
        class="mb-4"
        :places-types="placesTypesFilterOptions"
        v-model="typeFilter"
      />

      <!-- Results List -->
      <place-card
        v-for="({ properties }, index) in filteredPlaces"
        :key="index"
        :name="properties.name"
        :placeType="properties.placeType"
        :placeState="properties.placeState"
        :street="properties.street"
        :addressNumber="properties.addressNumber"
        :postcode="properties.postcode"
        :link="properties.link"
        :moreInfoText="properties.moreInfoText"
        class="mb-5"
        v-on:click-map-icon="centerMapOnCardPlace(index)"
      />
    </v-container>

    <!-- Map -->
    <places-map :map-center="mapCenter" :places="filteredPlaces" />
  </div>
</template>

<script>
import LocaleSelector from "@/components/LocaleSelector";
import PlacesMap from "@/components/PlacesMap";
import PlacesTypeFilter from "@/components/PlacesTypeFilter";
import PlaceCard from "@/components/PlaceCard";

import { getPlacesGeojson } from "@/api/airtable";

import { typeFilterOptionsFromPlaces, sortPlaces } from "./utils";

export default {
  name: "MapView",
  data() {
    return {
      // Default map position
      mapCenter: [52.476, 13.4432],
      // Places data
      places: [],
      // Input config
      placesTypes: undefined,
      // Filters
      typeFilter: undefined
    };
  },
  components: {
    LocaleSelector,
    PlacesMap,
    PlacesTypeFilter,
    PlaceCard
  },
  async mounted() {
    // Get features
    this.places = await getPlacesGeojson();
  },
  computed: {
    filteredPlaces: function() {
      // Return either filtered places or all places
      const filteredPlaces = this.filterPlaces(this.places);
      // Sort
      const sortedFilteredPlaces = sortPlaces(filteredPlaces);
      return sortedFilteredPlaces;
    },
    placesTypesFilterOptions: function() {
      return typeFilterOptionsFromPlaces(this.places);
    },
    localisedFormLink: function() {
      if (this.$vuetify.lang.current === "de") {
        // German form
        return "https://airtable.com/shrha1xtBUIpQwtGe";
      }
      // English form
      return "https://airtable.com/shrOgkjNoVXR5dYJt";
    }
  },
  methods: {
    centerMapOnCardPlace: function(index) {
      const place = this.filteredPlaces[index];
      const { coordinates } = place.geometry;
      this.mapCenter = [...coordinates].reverse();
    },
    filterPlaces(allPlaces) {
      // If there's filters
      if (this.typeFilter != undefined && this.typeFilter.length > 0) {
        // Filter places based on type
        const filteredPlaces = allPlaces.filter(place => {
          // If the place type is included in the filter list
          return this.typeFilter.includes(place.properties.placeType);
        });
        return filteredPlaces;
      }
      // Show all
      return allPlaces;
    }
  }
};
</script>

<style scoped>
.content {
  overflow-y: scroll;
}

.map-view-grid {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 2fr;
}

@media (max-width: 640px) {
  .map-view-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1000px) {
  .map-view-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .map-view-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 50vh 50vh;
  }
}
</style>
