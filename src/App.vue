<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import Vue from "vue";

export default Vue.extend({
  name: "App",
  components: {}
});
</script>

<style>
/* Style overrides */
.leaflet-control-attribution leaflet-control {
  color: black !important;
}
</style>
