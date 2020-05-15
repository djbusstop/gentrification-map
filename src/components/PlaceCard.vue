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

      <!-- Chips -->
      <v-row class="mb-2">
        <v-chip
          class="ml-2"
          small
          :color="placeStateChipColor"
        >{{ $vuetify.lang.t(`$vuetify.placeStates.${placeState}`) }}</v-chip>
        <v-chip
          class="ml-2"
          small
          :color="getPlaceTypeColor(placeType)"
        >{{ $vuetify.lang.t(`$vuetify.placeTypes.${placeType}`) }}</v-chip>
      </v-row>

      <!-- Address -->
      <p class="mt-4 mb-2">{{ `${street} ${addressNumber}, Berlin ${postcode || ""}` }}</p>

      <!-- More info link -->
      <a
        v-if="link"
        :href="link"
        target="_blank"
      >{{ $vuetify.lang.t(`$vuetify.placeCard.moreInfoLink`) }}</a>
    </v-container>
  </v-card>
</template>

<script>
import { PlaceTypeColor, PlaceStateColor } from "@/map/styles";
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
    placeState: {
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
    link: {
      type: String
    },
    moreInfoText: {
      type: String
    }
  },
  computed: {
    placeStateChipColor() {
      return PlaceStateColor[this.placeState] || "";
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
