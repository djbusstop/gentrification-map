<template>
  <div id="map"></div>
</template>

<script>
// import L from "leaflet";
import Map from "@/models/map";
import { featureCollection } from "@turf/helpers";

import { placesPointsLayer } from "@/views/layers/placesPointsLayer";
import { aroundNeukoellnLayer } from "@/views/layers/aroundNeukoellnLayer";

export default {
  name: "PlacesMap",
  props: {
    mapCenter: {
      required: true,
      type: Array
    },
    // Takes a list of Point features.
    places: {
      type: Array
    }
  },
  data() {
    return {
      map: undefined,
      placesPoints: undefined
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
    // Create places layer and draw it on map
    places(placesList) {
      if (placesList) {
        // Remove old points layer
        if (this.placesPoints) {
          this.map.removeLayer(this.placesPoints);
        }
        // Create feature collection
        const placesFeatureCollection = featureCollection(placesList);
        // Create Layer
        this.placesPoints = placesPointsLayer(placesFeatureCollection);
        // Add layer to map
        this.placesPoints.addTo(this.map);
      }
    }
  },
  methods: {
    // Add map to view
    initMap(mapCenter) {
      this.$nextTick(() => {
        this.map = new Map("map", {
          zoomControl: false,
          minZoom: 14,
          // Map bounds are around Neukölln
          maxBounds: [
            [52.504222, 13.390656],
            [52.452303, 13.502242]
          ]
        });
        this.map.setView(mapCenter, 14);

        // Add shape around Neukölln
        const aroundNeukoelln = aroundNeukoellnLayer();
        aroundNeukoelln.addTo(this.map);
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
