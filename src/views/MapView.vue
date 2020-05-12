<template>
  <div class="map-view-grid">
    <v-container>
      <v-app-bar flat color="none">
        <v-spacer />
        <!-- Locale selector -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">{{ $vuetify.lang.t('$vuetify.localeSelection.language') }}</v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="locale in locales"
              :key="locale.key"
              v-on:click="changeLocale(locale.key)"
            >
              <v-list-item-title>{{ $vuetify.lang.t(`$vuetify.localeSelection.${locale.i18nKey}`) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <h1>Title</h1>
    </v-container>
    <map-component :map-center="[52.496, 13.397]" :data="[closedPlaces]" />
  </div>
</template>

<script>
import MapComponent from "@/components/MapComponent";
import { getClosedPlacesGeojson } from "@/api";
export default {
  name: "MapView",
  data() {
    return {
      closedPlaces: null,
      locales: [
        {
          i18nKey: "german",
          key: "de"
        },
        {
          i18nKey: "english",
          key: "en"
        }
      ]
    };
  },
  components: {
    MapComponent
  },
  async mounted() {
    // Get Closed Places
    const closedPlaces = await getClosedPlacesGeojson();
    this.closedPlaces = closedPlaces;
  },
  methods: {
    changeLocale(newLocale) {
      this.$vuetify.lang.current = newLocale;
    }
  }
};
</script>

<style scoped>
.map-view-grid {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>
