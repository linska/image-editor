/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from "vuetify";
// Styles
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          // primary: "#263238",
          // secondary: "#37474F",
          // surface: "#1e2527",
          // accent: "#E60033",
        },
      },
    },
  },
  defaults: {
    VTextField: {
      variant: "outlined",
      dirty: true,
    },
    VBtn: {},
    VLabel: {
      class: "text-body-small font-weight-bold",
    },
  },
});
