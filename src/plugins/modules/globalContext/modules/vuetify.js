import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export const vuetify = createVuetify({
  theme: { defaultTheme: "dark" },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

export const installVuetify = (vue) => vue.use(vuetify);
