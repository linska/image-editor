import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";

const vuetify = createVuetify();

createApp(App).use(createPinia()).use(vuetify).mount("#app");
