<template>
  <v-window-item value="tab-login">
    <v-card flat class="px-2 py-8">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        <v-text-field
          v-if="isEmailMode"
          v-model="authData.email"
          :rules="rules.email"
          label="Введите email"
          placeholder="Placeholder"
          outlined
          @click:append="isEmailMode = false"
          append-icon="mdi-cellphone-android"
        />
        <v-text-field
          v-else
          v-mask="'+0(000) 000-0000'"
          v-model="authData.phone"
          :rules="rules.phone"
          label="Введите телефон"
          placeholder="Placeholder"
          outlined
          @click:append="isEmailMode = true"
          append-icon="mdi-email"
        />
        <v-text-field
          v-model="authData.password"
          :rules="rules.password"
          label="Введите пароль"
          placeholder="Placeholder"
          outlined
          :type="showPassword ? 'password' : 'text'"
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
        />
        <v-btn color="primary" block @click="logInAction"> Войти </v-btn>
      </v-form>
    </v-card>
  </v-window-item>
</template>

<script>
import { useAuth } from "@composable/useAuth";

export default {
  name: "TabLogin",

  setup() {
    const { logIn } = useAuth();

    return { logIn };
  },

  data() {
    return {
      showPassword: true,
      isFormValid: true,
      isEmailMode: true,
      authData: {
        email: "test.user@gmail.com",
        phone: "test.user@gmail.com",
        password: "23yg43kvgq",
      },
      rules: {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "E-mail is required"],
        phone: [
          (v) =>
            /^[+][0-9]{1}[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$/.test(v) ||
            "E-mail is required",
        ],
      },
    };
  },
  methods: {
    logInAction() {
      if (!this.$refs.form.validate()) return;

      this.logIn({
        email: this.authData.email,
        password: this.authData.password,
      }).catch((e) => {
        this.$emit("onError", e);
      });
    },
  },
};
</script>
