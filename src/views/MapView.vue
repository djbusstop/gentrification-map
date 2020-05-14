<template>
  <div class="map-view-grid">
    <!-- Sidebar -->
    <v-container>
      <v-app-bar color="transparent" flat>
        <v-spacer />
        <!-- Locale selector -->
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>language</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="locale in locales"
              :key="locale.key"
              v-on:click="changeLocale(locale.key)"
            >
              <v-list-item-title>
                {{
                  $vuetify.lang.t(`$vuetify.localeSelection.${locale.i18nKey}`)
                }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <h1>{{ $vuetify.lang.t("$vuetify.title") }}</h1>
      <p>{{ $vuetify.lang.t("$vuetify.description") }}</p>

      <h2>Filter place type</h2>
      <places-type-filter
        :places-types="placesTypesFilterOptions"
        v-model="typeFilter"
      />

      <!-- Cards -->
      <!-- <place-card
        v-for="place in filteredPlaces"
        :key="place.id"
        :place="place"
        class="mb-5"
      /> -->
    </v-container>

    <!-- Map -->
    <places-map :map-center="[52.476, 13.4432]" :places="filteredPlaces" />
  </div>
</template>

<script>
import PlacesMap from "@/components/PlacesMap";
import PlacesTypeFilter from "@/components/PlacesTypeFilter";

import { getClosedPlacesGeojson } from "@/api/airtable";
import { PlaceTypeColor } from "@/map/styles";

export default {
  name: "MapView",
  data() {
    return {
      // Places Data (lists of features)
      closedPlaces: [],
      openedPlaces: [],
      facingEvictionPlaces: [],
      // Input config
      placesTypes: undefined,
      // Filters
      typeFilter: undefined,
      placesLayerFilter: undefined,
      // Settings
      locales: [
        {
          i18nKey: "german",
          key: "de"
        },
        {
          i18nKey: "english",
          key: "en"
        }
      ]
    };
  },
  components: {
    PlacesMap,
    PlacesTypeFilter
    // PlaceCard
  },
  async mounted() {
    // Get features from backends
    this.closedPlaces = await getClosedPlacesGeojson();
  },
  computed: {
    filteredPlaces: function() {
      const allPlaces = [...this.closedPlaces];
      // If there's filters
      if (this.typeFilter != undefined && this.typeFilter.length > 0) {
        // Filter places based on type
        const filteredPlaces = allPlaces.filter((place) => {
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
        // Get unique values of closedPlaces placeTypes
        const availableTypes = this.closedPlaces.reduce((acc, place) => {
          // If place type already in list
          if (acc.includes(place.properties.placeType)) {
            return acc;
          }
          return [place.properties.placeType, ...acc];
        }, []);

        // Map the unique types to the config
        const availableTypesObjects = availableTypes.map((type) => {
          return {
            key: type,
            color: PlaceTypeColor[type]
          };
        });
        return availableTypesObjects;
      }
      return [];
    }
  },
  methods: {
    changeLocale(newLocale) {
      this.$vuetify.lang.current = newLocale;
    }
  }
};
</script>

<style scoped>
.map-view-grid {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>
