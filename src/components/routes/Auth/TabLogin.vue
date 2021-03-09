<template>
  <v-tab-item value="tab-login">
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
          :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
          :type="showPassword ? 'password' : 'text'"
          @click:append="showPassword = !showPassword"
          v-model="authData.password"
          :rules="rules.password"
          label="Введите пароль"
          placeholder="Placeholder"
          outlined
        />
        <v-btn color="primary" block @click="login">
          Войти
        </v-btn>
      </v-form>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "TabLogin",
  components: {},
  data() {
    return {
      showPassword: true,
      isFormValid: true,
      authData: {
        email: "admin@gmail.com",
        password: "224224390sg"
      },
      rules: {
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [v => !!v || "E-mail is required"]
      }
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("auth/logIn", {
            email: this.authData.email,
            password: this.authData.password
          });
        } catch (e) {
          this.$emit("onError", e);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.TabLogin {
}
</style>
