<template>
  <v-container>
    <v-card>
      <v-card-title>Gentrification Map Berlin</v-card-title>
      <v-card-text>Some text</v-card-text>
      <v-card-actions>
        <v-btn v-on:click="goToMap()">Go to map</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router";
export default {
  name: "Home",
  // components: {
  //   HelloWorld
  // }
  methods: {
    goToMap() {
      router.push("/map");
    }
  }
};
</script>
