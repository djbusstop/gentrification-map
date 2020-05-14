<template>
  <v-chip-group column multiple v-model="selectedTypes">
    <v-chip
      v-for="placeType in placesTypes"
      :key="placeType.key"
      :color="placeType.color"
    >
      {{ $vuetify.lang.t(`$vuetify.placeTypes.${placeType.key}`) }}
    </v-chip>
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
      const keysList = newValue.map((index) => {
        return this.placesTypes[index].key;
      });
      this.$emit("input", keysList);
    }
  }
};
</script>

<style></style>
