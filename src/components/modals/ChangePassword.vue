<template>
  <v-dialog persistent :model-value="!!component" width="500">
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
                @click:appendInner="
                  passwordVisibility.oldPassword =
                    !passwordVisibility.oldPassword
                "
                :append-inner-icon="
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
                @click:appendInner="
                  passwordVisibility.newPassword =
                    !passwordVisibility.newPassword
                "
                :append-inner-icon="
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
                @click:appendInner="
                  passwordVisibility.newPasswordRepeat =
                    !passwordVisibility.newPasswordRepeat
                "
                :append-inner-icon="
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
          <v-btn color="danger" @click="closeModal()">
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
import { useNotify } from "@composable/useNotify";
import { useModal } from "../../composable/useModal";
import { API_changePassword } from "@api/userSettings";
const { notifyInfo } = useNotify();

export default {
  name: "ChangePassword",

  setup() {
    const { data, component, closeModal } = useModal();

    return { data, component, closeModal };
  },
  data() {
    return {
      formData: {
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      },
      rules: {
        oldPassword: [
          (v) => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "Wrong password",
        ],
        newPassword: [
          (v) => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "Wrong password",
          (v) =>
            v !== this.formData.oldPassword ||
            "Can't be same with old password",
        ],
        newPasswordRepeat: [
          (v) => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "Wrong password",
          (v) =>
            v !== this.formData.oldPassword ||
            "Can't be same with old password",
          (v) =>
            v === this.formData.newPassword || "Must be same with new password",
        ],
      },
      passwordVisibility: {
        oldPassword: true,
        newPassword: true,
        newPasswordRepeat: true,
      },
    };
  },
  methods: {
    async changePassword() {
      if (!this.$refs.changePassword.validate()) return;

      await API_changePassword(this.formData)
        .then(() => {
          notifyInfo("ffff");
          this.closeModal(true);
        })
        .catch(() => {
          notifyInfo("ffff");
        });
    },
  },
};
</script>

<style lang="scss"></style>
