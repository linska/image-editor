import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

export default createVuetify({
  theme: {
    defaultTheme: "Light",
    themes: {
      Light: {
        colors: {
          primary: "#263739",
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