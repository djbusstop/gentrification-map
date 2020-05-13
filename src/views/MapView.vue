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

      <!-- Layers toggle -->
      <h3>Layers</h3>
      <v-btn-toggle multiple dark>
        <v-btn>Closed</v-btn>
        <v-btn>Opened</v-btn>
        <v-btn>Facing Eviction</v-btn>
      </v-btn-toggle>
    </v-container>

    <!-- Map -->
    <places-map :map-center="[52.476, 13.4432]" :places="filteredPlaces" />
  </div>
</template>

<script>
import PlacesMap from "@/components/PlacesMap";

import { getClosedPlacesGeojson } from "@/api/airtable";

export default {
  name: "MapView",
  data() {
    return {
      // Places Data (lists of features)
      closedPlaces: [],
      openedPlaces: [],
      facingEvictionPlaces: [],
      // Inputs
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
    PlacesMap
  },
  async mounted() {
    // Get features from backends
    this.closedPlaces = await getClosedPlacesGeojson();
  },
  computed: {
    // Send the filtered places to the map
    filteredPlaces: function() {
      const allPlaces = [...this.closedPlaces];
      return allPlaces;
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
