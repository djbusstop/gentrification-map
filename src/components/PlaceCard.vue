<template>
  <v-card flat>
    <v-container>
      <v-row no-gutters>
        <h3>{{ place.properties.name }}</h3>
        <v-spacer />
        <v-btn
          icon
          v-on:click="handleMapIconClick(place.properties.geometry.coordinates)"
        >
          <v-icon>map</v-icon>
        </v-btn>
      </v-row>
      <v-card-subtitle>{{ place.properties.placeType }}</v-card-subtitle>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PlaceCard",
  props: {
    place: Object
  },
  methods: {
    handleMapIconClick(coords) {
      this.$emit("click-map-icon", coords);
    }
  }
};
</script>
