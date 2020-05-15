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
      <!-- <p>{{ $vuetify.lang.t("$vuetify.description") }}</p> -->

      <a target="_blank" :href="localisedFormLink">{{ $vuetify.lang.t("$vuetify.reportPlace") }}</a>

      <filter-chips
        class="mt-7"
        i18nKey="placeStates"
        :options="placesStatesFilterOptions"
        v-model="stateFilter"
      />
      <filter-chips
        i18nKey="placeTypes"
        class="mb-4"
        :options="placesTypesFilterOptions"
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
import PlaceCard from "@/components/PlaceCard";
import FilterChips from "@/components/FilterChips";

import { getPlacesGeojson } from "@/api/airtable";

import {
  typeFilterOptionsFromPlaces,
  stateFilterOptionsFromPlaces,
  sortPlaces
} from "./utils";

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
      placesStates: undefined,
      // Filters
      typeFilter: [],
      stateFilter: []
    };
  },
  components: {
    LocaleSelector,
    PlacesMap,
    PlaceCard,
    FilterChips
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
    placesStatesFilterOptions: function() {
      return stateFilterOptionsFromPlaces(this.places);
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
      const hasTypeFilter =
        this.typeFilter != undefined && this.typeFilter.length > 0;
      const hasStateFilter =
        this.stateFilter != undefined && this.stateFilter.length > 0;
      // If there are filters
      if (hasTypeFilter || hasStateFilter) {
        const filteredPlaces = allPlaces.filter(place => {
          // If the place type is included in the filter list
          if (hasStateFilter && !hasTypeFilter) {
            return this.stateFilter.includes(place.properties.placeState);
          }
          if (hasTypeFilter && !hasStateFilter) {
            return this.typeFilter.includes(place.properties.placeType);
          }
          return (
            this.typeFilter.includes(place.properties.placeType) &&
            this.stateFilter.includes(place.properties.placeState)
          );
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
