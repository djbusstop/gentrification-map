<template>
  <div class="map-view-grid">
    <!-- Sidebar -->
    <v-container class="content">
      <v-app-bar color="transparent" flat>
        <v-spacer />
        <v-btn
          icon
          href="https://github.com/datadrivenpropaganda/gentrification-map/blob/master/README.md"
        >
          <v-icon>code</v-icon>
        </v-btn>
        <locale-selector />
      </v-app-bar>

      <h1>{{ $vuetify.lang.t("$vuetify.title") }}</h1>
      <p>{{ $vuetify.lang.t("$vuetify.description") }}</p>

      <a>{{ $vuetify.lang.t("$vuetify.reportClosedPlace") }}</a>

      <h2 class="mt-5">{{ $vuetify.lang.t("$vuetify.filters.filterPlaceTypeTitle") }}</h2>
      <places-type-filter :places-types="placesTypesFilterOptions" v-model="typeFilter" />

      <h2 class="mt-5 mb-2">{{ $vuetify.lang.t("$vuetify.resultsListTitle") }}</h2>
      <!-- Cards -->
      <place-card
        v-for="(place, index) in filteredPlaces"
        :key="index"
        :name="place.properties.name"
        :placeType="place.properties.placeType"
        :street="place.properties.street"
        :addressNumber="place.properties.addressNumber"
        :postcode="place.properties.postcode"
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

import {
  getClosedPlacesGeojson,
  getFacingEvictionPlacesGeojson
} from "@/api/airtable";

import { typeFilterOptionsFromPlaces } from "./utils";

export default {
  name: "MapView",
  data() {
    return {
      // Default map position
      mapCenter: [52.476, 13.4432],
      // Places data
      closedPlaces: [],
      facingEvictionPlaces: [],
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
    // Get features from backends
    this.closedPlaces = await getClosedPlacesGeojson();
    this.facingEvictionPlaces = await getFacingEvictionPlacesGeojson();
  },
  computed: {
    filteredPlaces: function() {
      const allPlaces = [...this.closedPlaces, ...this.facingEvictionPlaces];
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
    },
    placesTypesFilterOptions: function() {
      if (this.closedPlaces) {
        return typeFilterOptionsFromPlaces(this.closedPlaces);
      }
      return [];
    }
  },
  methods: {
    centerMapOnCardPlace: function(index) {
      const place = this.filteredPlaces[index];
      this.mapCenter = place.geometry.coordinates.reverse();
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
</style>
