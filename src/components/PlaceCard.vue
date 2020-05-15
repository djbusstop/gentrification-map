<template>
  <v-card flat>
    <v-container>
      <v-row align="center" no-gutters>
        <h3>{{ name }}</h3>
        <v-spacer />
        <v-btn icon v-on:click="$emit('click-map-icon')">
          <v-icon>map</v-icon>
        </v-btn>
      </v-row>

      <p>{{ `${street} ${addressNumber} Berlin ${postcode || ""}` }}</p>

      <v-row class="mt-2">
        <v-chip class="ml-2" small :color="red">{{ $vuetify.lang.t(`$vuetify.${placeStatei18n}`) }}</v-chip>
        <v-chip
          class="ml-2"
          small
          :color="getPlaceTypeColor(placeType)"
        >{{ $vuetify.lang.t(`$vuetify.placeTypes.${placeType}`) }}</v-chip>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { PlaceTypeColor } from "@/map/styles";
export default {
  name: "PlaceCard",
  props: {
    index: {
      type: Number
    },
    name: {
      type: String
    },
    placeType: {
      type: String
    },
    street: {
      type: String
    },
    addressNumber: {
      type: String
    },
    postcode: {
      type: String
    },
    table: {
      type: String
    }
  },
  computed: {
    facingEviction() {
      return this.table === "facingEvictionPlaces";
    },
    closed() {
      return this.table === "closedPlaces";
    },
    placeStatei18n() {
      if (this.closed) return "closed";
      if (this.facingEviction) return "facingEviction";
      return "unknown";
    }
  },
  methods: {
    handleMapIconClick(coords) {
      this.$emit("click-map-icon", coords);
    },
    getPlaceTypeColor(placeType) {
      return PlaceTypeColor[placeType];
    }
  }
};
</script>
