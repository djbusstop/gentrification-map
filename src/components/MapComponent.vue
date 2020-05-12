<template>
  <div id="map"></div>
</template>

<script>
// import L from "leaflet";
import Map from "@/models/map";
// import { getClosedPlacesGeojson } from "@/api";

// // Layers
// import neukoellnShape from "@/assets/data/berlinNeukoelln.json";
// import postcodes from "@/assets/data/berlinPostcodes.json";

export default {
  name: "Map",
  props: {
    mapCenter: {
      required: true,
      type: Array
    },
    layers: {
      type: Array
    }
  },
  data() {
    return {
      map: null
    };
  },
  async mounted() {
    this.initMap(this.mapCenter);
  },
  watch: {
    // If map center is updated from the parent
    mapCenter(value) {
      this.map.setView(value, 14);
    },
    layers(layersList) {
      if (layersList && layersList.length > 0) {
        layersList.forEach((layer) => {
          console.log(layer);
          layer.addTo(this.map);
        });
      }
    }
  },
  methods: {
    // Add map to view
    initMap(mapCenter) {
      this.$nextTick(() => {
        this.map = new Map("map", { zoomControl: false });
        this.map.setView(mapCenter, 14);
      });
    }
  }
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
