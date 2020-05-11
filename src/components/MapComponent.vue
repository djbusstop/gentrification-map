<template>
  <div id="map"></div>
</template>

<script>
import Map from "@/models/map";

export default {
  name: "Map",
  props: {
    mapCenter: {
      required: true,
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
      this.map.setView(value, 10);
    }
    // data(value) {
    //   this.map.drawPoints(value);
    //   const point = value.features[5].geometry.coordinates;
    //   const bounds = [this.userCoords, point.reverse()];
    //   this.map.fitZoom(bounds);
    // }
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
