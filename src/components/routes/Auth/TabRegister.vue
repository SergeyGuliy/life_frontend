<template>
  <v-window-item value="tab-registration">
    <v-card flat class="px-2 py-8">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        <v-text-field
          v-model="authData.email"
          :rules="rules.email"
          label="Введите email"
          placeholder="Placeholder"
          outlined
        />
        <v-text-field
          v-model="authData.phone"
          v-mask="'+0(000) 000-0000'"
          :rules="rules.phone"
          label="Введите телефон"
          placeholder="Placeholder"
          outlined
        />
        <v-text-field
          :append-inner-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
          :type="showPassword ? 'password' : 'text'"
          @click:appendInner="showPassword = !showPassword"
          v-model="authData.password"
          :rules="rules.password"
          label="Введите пароль"
          placeholder="Placeholder"
          outlined
        />
        <v-text-field
          :append-inner-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
          :type="showPassword ? 'password' : 'text'"
          @click:appendInner="showPassword = !showPassword"
          v-model="authData.passwordRepeat"
          :rules="rules.passwordRepeat"
          label="Повторите пароль"
          placeholder="Placeholder"
          outlined
        />
        <v-btn color="primary" block @click="registrationAction">
          Зарегистрировать
        </v-btn>
      </v-form>
    </v-card>
  </v-window-item>
</template>

<script>
import { useAuth } from "../../../composable/useAuth";

export default {
  name: "TabRegister",

  setup() {
    const { registration } = useAuth();

    return { registration };
  },

  data() {
    return {
      showPassword: true,
      isFormValid: true,
      authData: {
        email: "test.user@gmail.com",
        phone: "+2(222) 222-2212",
        password: "23yg43kvgq",
        passwordRepeat: "23yg43kvgq",
      },
      rules: {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "E-mail is required"],
        passwordRepeat: [
          (v) => !!v || "E-mail is required",
          (v) => v === this.authData.password || "Password must be same",
        ],
      },
    };
  },

  methods: {
    registrationAction() {
      if (!this.$refs.form.validate()) return;

      this.registration({
        email: this.authData.email,
        phone: this.authData.phone,
        password: this.authData.password,
      }).catch((e) => {
        this.$emit("onError", e);
      });
    },
  },
};
</script>
