<template>
  <v-card flat>
    <v-container>
      <v-row align="center" no-gutters>
        <h3>{{ name }}</h3>
        <v-spacer />
        <v-btn icon v-on:click="this.$emit('click-place-card-map-icon', index)">
          <v-icon>map</v-icon>
        </v-btn>
      </v-row>
      <v-row class="mt-2">
        <v-chip class="ml-2" small :color="red">
          {{ $vuetify.lang.t(`$vuetify.closed`) }}
        </v-chip>
        <v-chip class="ml-2" small :color="getPlaceTypeColor(placeType)">
          {{ $vuetify.lang.t(`$vuetify.placeTypes.${placeType}`) }}
        </v-chip>
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
