import Vue from "vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import "material-design-icons-iconfont/dist/material-design-icons.css";

import en from "@/locale/en";
import de from "@/locale/de";

Vue.use(Vuetify);

export default new Vuetify({
  // i18n
  lang: {
    locales: { en, de },
    current: "en"
  },
  // Icons
  icons: {
    iconfont: "md"
  },
  // Theme
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#ee44aa",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: "#ee44aa",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        darkBg: "#000000"
      }
    }
  }
});
