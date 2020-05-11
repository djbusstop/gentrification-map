<template>
  <div class="map-view-grid">
    <v-container>
      <h1>Title</h1>
    </v-container>
    <map-component :map-center="[52.496, 13.397]" :data="[closedPlaces]" />
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent";
import { getClosedPlacesGeojson } from "@/api";
export default {
  name: "MapView",
  data() {
    return {
      closedPlaces: []
    };
  },
  components: {
    MapComponent
  },
  async mounted() {
    const closedPlaces = await getClosedPlacesGeojson();
    this.closedPlaces = closedPlaces;
  }
};
</script>

<style scoped>
.map-view-grid {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>
