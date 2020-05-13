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
      <v-btn-toggle v-model="layersToggle" multiple dark>
        <v-btn>Closed</v-btn>
        <v-btn>Opened</v-btn>
        <v-btn>Facing Eviction</v-btn>
      </v-btn-toggle>
    </v-container>

    <!-- Map -->
    <map-component
      :map-center="[52.476, 13.4432]"
      :layers="[...variableLayers, ...fixedLayers]"
    />
  </div>
</template>

<script>
import L from "leaflet";
import Heatmap from "leaflet-heatmap";

import { getClosedPlacesGeojson } from "@/api";

import { placesPointsLayer } from "./layers/placesPointsLayer";

import MapComponent from "@/components/MapComponent";
import neukoellnShape from "@/assets/data/berlinNeukoelln.json";
import aroundNeukoellnShape from "@/assets/data/mergedAreaAroundNK.json";

export default {
  name: "MapView",
  data() {
    return {
      variableLayers: [],
      fixedLayers: [],
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
    MapComponent
  },
  async mounted() {
    // Get closed places
    const closedPlaces = await getClosedPlacesGeojson();
    // const openedPlaces = await getOpenedPlacesGeojson();

    // Create initial layers
    const closedPlacesLayer = placesPointsLayer(closedPlaces);
    const neukollnShapeLayer = this.createNeukoellnShapeLayer(neukoellnShape);
    const areaAroundNeukollnShapeLayer = this.createAreaAroundNeukoellnShapeLayer(
      aroundNeukoellnShape
    );

    this.fixedLayers = [areaAroundNeukollnShapeLayer];
    this.variableLayers = [closedPlacesLayer];
  },
  watch: {
    // Change data
    dataToggle(newValue) {
      console.log(newValue);

      // 0 - facing eviction
      // 1 - closed places
      // 2 - opened places
    }
  },
  methods: {
    changeLocale(newLocale) {
      this.$vuetify.lang.current = newLocale;
    },
    // Neukoelln shape layer
    createNeukoellnShapeLayer(neukoellnShape) {
      // Filter out only parts we want
      return L.geoJSON(neukoellnShape, {
        style() {
          return {
            fillColor: "transparent",
            color: "black",
            weight: 8
          };
        }
      });
    },
    createAreaAroundNeukoellnShapeLayer(shape) {
      return L.geoJSON(shape, {
        style() {
          return {
            fillColor: "black",
            fillOpacity: 0.8,
            color: "black",
            weight: 8
          };
        }
      });
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
