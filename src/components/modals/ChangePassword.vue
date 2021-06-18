<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="CreateRoom">
      <v-form ref="changePassword">
        <v-card-title class="pb-6">
          {{ $t("modals.changePassword") }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="formData.oldPassword"
                :type="passwordVisibility.oldPassword ? 'password' : 'text'"
                :label="$t('forms.labels.enterOldPassword')"
                :rules="rules.oldPassword"
                @click:append="
                  passwordVisibility.oldPassword = !passwordVisibility.oldPassword
                "
                :append-icon="
                  passwordVisibility.oldPassword ? 'mdi-lock' : 'mdi-lock-open'
                "
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="formData.newPassword"
                :type="passwordVisibility.newPassword ? 'password' : 'text'"
                :label="$t('forms.labels.enterNewPassword')"
                :rules="rules.newPassword"
                @click:append="
                  passwordVisibility.newPassword = !passwordVisibility.newPassword
                "
                :append-icon="
                  passwordVisibility.newPassword ? 'mdi-lock' : 'mdi-lock-open'
                "
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="formData.newPasswordRepeat"
                :label="$t('forms.labels.repeatNewPassword')"
                :type="
                  passwordVisibility.newPasswordRepeat ? 'password' : 'text'
                "
                :rules="rules.newPasswordRepeat"
                @click:append="
                  passwordVisibility.newPasswordRepeat = !passwordVisibility.newPasswordRepeat
                "
                :append-icon="
                  passwordVisibility.newPasswordRepeat
                    ? 'mdi-lock'
                    : 'mdi-lock-open'
                "
                outlined
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
            {{ $t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="changePassword">
            {{ $t("buttons.change") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modal from "../../mixins/modal";
import { api } from "../../assets/helpers/api";

export default {
  name: "ChangePassword",
  mixins: [modal],
  data() {
    return {
      formData: {
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: ""
      },
      rules: {
        oldPassword: [
          v => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "Wrong password"
        ],
        newPassword: [
          v => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "Wrong password",
          v =>
            v !== this.formData.oldPassword || "Can't be same with old password"
        ],
        newPasswordRepeat: [
          v => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "Wrong password",
          v =>
            v !== this.formData.oldPassword ||
            "Can't be same with old password",
          v =>
            v === this.formData.newPassword || "Must be same with new password"
        ]
      },
      passwordVisibility: {
        oldPassword: true,
        newPassword: true,
        newPasswordRepeat: true
      }
    };
  },
  methods: {
    async changePassword() {
      if (this.$refs.changePassword.validate()) {
        await api.userSettings
          .changePassword(this.formData)
          .then(() => {
            this.$noti().info("ffff");
            this.close(true);
          })
          .catch(() => {
            this.$noti().error("ffff");
          });
      }
    }
  }
};
</script>

<style lang="scss"></style>
