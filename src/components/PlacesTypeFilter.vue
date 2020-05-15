<template>
  <v-chip-group column multiple v-model="selectedTypes">
    <v-chip
      v-for="(placeType, index) in placesTypes"
      :key="index"
      :color="getChipColor(placeType.color, index, selectedTypes)"
    >{{ $vuetify.lang.t(`$vuetify.placeTypes.${placeType.key}`) }}</v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: "PlacesTypeFilter",
  props: {
    placesTypes: {
      type: Array
    }
  },
  data() {
    return {
      selectedTypes: []
    };
  },
  watch: {
    selectedTypes(newValue) {
      // Build list of keys
      const keysList = newValue.map(index => {
        return this.placesTypes[index].key;
      });
      this.$emit("input", keysList);
    }
  },
  methods: {
    getChipColor(color, index, selectedTypes) {
      if (selectedTypes.length === 0) return color;
      if (selectedTypes.includes(index)) return color;
      return null;
    }
  }
};
</script>

<style></style>
