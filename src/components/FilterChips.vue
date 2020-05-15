<template>
  <v-chip-group column multiple v-model="selectedTypes">
    <v-chip
      v-for="(option, index) in options"
      :key="index"
      :color="getChipColor(option.color, index, selectedTypes)"
    >{{ $vuetify.lang.t(`$vuetify.${i18nKey}.${option.key}`) }}</v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: "FilterChips",
  props: {
    // Options include a key and color
    options: {
      type: Array
    },
    i18nKey: {
      type: String
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
        return this.options[index].key;
      });
      // v-model get a list of keys to filter by
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
