<template>
  <v-tab-item value="tab-registration">
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
          v-mask="'+#(###) ###-####'"
          :rules="rules.phone"
          label="Введите телефон"
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
        <v-text-field
          :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
          :type="showPassword ? 'password' : 'text'"
          @click:append="showPassword = !showPassword"
          v-model="authData.passwordRepeat"
          :rules="rules.passwordRepeat"
          label="Повторите пароль"
          placeholder="Placeholder"
          outlined
        />
        <v-btn color="primary" block @click="registration">
          Зарегистрировать
        </v-btn>
      </v-form>
    </v-card>
  </v-tab-item>
</template>

<script>
export default {
  name: "TabRegister",
  components: {},
  data() {
    return {
      showPassword: true,
      isFormValid: true,
      authData: {
        email: "test.user@gmail.com",
        phone: "+2(222) 222-2212",
        password: "23yg43kvgq",
        passwordRepeat: "23yg43kvgq"
      },
      rules: {
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [v => !!v || "E-mail is required"],
        passwordRepeat: [
          v => !!v || "E-mail is required",
          v => v === this.authData.password || "Password must be same"
        ]
      }
    };
  },
  methods: {
    async registration() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("auth/registration", {
            email: this.authData.email,
            phone: this.authData.phone,
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
.TabRegister {
}
</style>
