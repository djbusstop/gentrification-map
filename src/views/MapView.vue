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
    </v-container>

    <!-- Map -->
    <map-component :map-center="[52.476, 13.4432]" :layers="layers" />
  </div>
</template>

<script>
import L from "leaflet";
import Heatmap from "leaflet-heatmap";

import { getClosedPlacesGeojson } from "@/api";

import MapComponent from "@/components/MapComponent";
import neukoellnShape from "@/assets/data/berlinNeukoelln.json";

export default {
  name: "MapView",
  data() {
    return {
      layers: [],
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
    // const closedPlaces = await getClosedPlacesGeojson();

    // Create initial layers
    // const closedPlacesLayer = this.createClosedPlacesLayer(closedPlaces);
    // const closedPlacesHeatmapLayer = this.createClosedPlacesHeatmapLayer(
    //   closedPlaces
    // );
    const neukollnShapeLayer = this.createNeukoellnShapeLayer(neukoellnShape);
    this.layers = [neukollnShapeLayer];
  },
  methods: {
    changeLocale(newLocale) {
      this.$vuetify.lang.current = newLocale;
    },
    // Closed places layer
    createClosedPlacesLayer(closedPlaces) {
      return L.geoJSON(closedPlaces, {
        // Marker Style
        pointToLayer: function(point, latlng) {
          return L.circleMarker(latlng);
        },
        style: function() {
          return {
            stroke: 2,
            fillColor: "black"
          };
        }
      });
    },
    // // Closed places layer
    // createClosedPlacesHeatmapLayer(closedPlaces) {
    //   // Get data in correct shape for heatmap
    //   const closedPlacesHeatmapData = closedPlaces.features.map((place) => {
    //     return {
    //       lat: place.geometry.coordinates[1],
    //       lng: place.geometry.coordinates[0],
    //       value: 1
    //     };
    //   });

    //   // Create heatmap layer
    //   const heatmapLayer = new Heatmap({
    //     radius: 10,
    //     scaleRadius: true,
    //     latField: "lat",
    //     lngField: "lng",
    //     valueField: "value"
    //   });

    //   // Set data on heatmap layer
    //   heatmapLayer.setData({ data: closedPlacesHeatmapData });
    //   return heatmapLayer;
    // },
    // Neukoelln shape layer
    createNeukoellnShapeLayer(neukoellnShape) {
      // Filter out only parts we want
      return L.geoJSON(neukoellnShape, {
        style() {
          return {
            fillColor: "transparent",
            color: "red",
            weight: 10
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
