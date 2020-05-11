<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import "leaflet/dist/leaflet.css";

export default Vue.extend({
  name: "App",
  components: {}
});
</script>
