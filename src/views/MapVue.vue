<template>
  <div class="map-view-grid">
    <v-container>
      <h1>Title</h1>
    </v-container>
    <map-component />
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent";
export default {
  name: "Map",
  components: {
    MapComponent
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
