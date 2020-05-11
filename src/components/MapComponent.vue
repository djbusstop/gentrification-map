<template>
  <div id="map"></div>
</template>

<script>
import Map from "@/models/map";

export default {
  name: "Map",
  props: {
    mapCenter: {
      type: undefined
    }
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    mapCenter(value) {
      this.map.setView(value, 18);
    }
    // data(value) {
    //   this.map.drawPoints(value);
    //   const point = value.features[5].geometry.coordinates;
    //   const bounds = [this.userCoords, point.reverse()];
    //   this.map.fitZoom(bounds);
    // }
  },
  methods: {
    initMap() {
      this.$nextTick(() => {
        this.map = new Map("map", { zoomControl: false });
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
