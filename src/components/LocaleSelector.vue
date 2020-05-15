<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>language</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="locale in locales"
        :key="locale.key"
        v-on:click="changeLocale(locale.key)"
        :disabled="$vuetify.lang.current === locale.key"
      >
        <v-list-item-title>{{ $vuetify.lang.t(`$vuetify.localeSelection.${locale.i18nKey}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
// Locale definitions
const locales = [
  {
    i18nKey: "english",
    key: "en"
  },
  {
    i18nKey: "german",
    key: "de"
  }
];

export default {
  name: "LocaleSelector",
  data() {
    return {
      locales
    };
  },
  methods: {
    changeLocale(newLocale) {
      this.$vuetify.lang.current = newLocale;
    }
  }
};
</script>

<style></style>
