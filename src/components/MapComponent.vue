<template>
  <div id="map"></div>
</template>

<script>
import L from "leaflet";
import Map from "@/models/map";

export default {
  name: "Map",
  props: {
    mapCenter: {
      required: true,
      type: Array
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap(this.mapCenter);
  },
  watch: {
    mapCenter(value) {
      this.map.setView(value, 14);
    },
    data(value) {
      if (value) {
        value.forEach(featureCollection => {
          console.log(featureCollection);
          L.geoJSON(featureCollection).addTo(this.map);
        });
      }
    }
  },
  methods: {
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
