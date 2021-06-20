<template>
  <div class="cabinet container__inner">
    <v-row>
      <v-col class="px-1" cols="4">
        <v-card class="pa-2">
          <v-card-actions class="pt-4">
            <v-row>
              <!--              <pre>{{ profileSettings }}</pre>-->
              <v-col cols="12" class="pt-0">
                <v-card class="pa-4">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-avatar width="200" height="200" class="mx-auto d-flex">
                      <v-img :src="imgSrc" alt="" v-if="imgSrc" cover />
                      <v-img
                        :src="profileSettings.avatarBig | avatarLink"
                        alt=""
                        cover
                        v-else-if="profileSettings.avatarBig"
                      />
                      <v-btn class="green" v-else icon @click="clickInput">
                        <v-icon dark>
                          mdi-image-plus
                        </v-icon>
                      </v-btn>
                      <template v-if="hover">
                        <v-btn
                          class="red"
                          icon
                          @click="clearAvatar"
                          v-if="imgSrc"
                          absolute
                        >
                          <v-icon dark>
                            mdi-image-remove
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="red"
                          icon
                          @click="clearAvatar"
                          v-else-if="profileSettings.avatarBig"
                          absolute
                        >
                          <v-icon dark>
                            mdi-image-remove
                          </v-icon>
                        </v-btn>
                      </template>
                    </v-avatar>
                  </v-hover>
                </v-card>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-file-input
                  id="avatarInput"
                  :label="$t('forms.labels.avatarLabel')"
                  outlined
                  clearable
                  show-size
                  prepend-icon=""
                  append-icon="mdi-camera"
                  truncate-length="50"
                  accept="image/png, image/jpeg, image/bmp"
                  v-model="imgFile"
                ></v-file-input>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-select
                  v-model="$i18n.locale"
                  :menu-props="{ bottom: true, offsetY: true }"
                  :label="$t('forms.labels.locale')"
                  :items="$i18n.availableLocales"
                  outlined
                  @input="$changeLocale"
                >
                  <template v-slot:selection="slotData">
                    <v-list-item-content
                      v-text="LOCALES.find(i => i.key === slotData.item).title"
                    />
                  </template>
                  <template v-slot:item="slotData">
                    <v-list-item-content
                      v-text="LOCALES.find(i => i.key === slotData.item).title"
                    />
                  </template>
                </v-select>
              </v-col>
              <v-col
                cols="12"
                class="d-flex align-center justify-space-between"
              >
                <div class="body-1">
                  Select theme color
                </div>
                <v-btn-toggle
                  v-model="$vuetify.theme.dark"
                  dense
                  mandatory
                  type="Boolean"
                >
                  <v-btn light :value="false" class="black--text">
                    Light
                  </v-btn>
                  <v-btn dark :value="true">
                    Dark
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <v-btn block @click="changePassword">
                  {{ $t("buttons.changePassword") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="px-1" cols="8">
        <v-card class="pa-2">
          <v-card-actions class="pt-4">
            <v-row>
              <v-col
                cols="12"
                class="pt-0 d-flex justify-space-between align-center"
              >
                <div class="body-1">
                  {{ $t("pages.cabinet.userProfile") }}
                </div>
                <v-btn @click="saveSettings">
                  <v-icon>
                    mdi-content-save
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12" class="py-0 pb-4">
                    <div class="body-1">
                      {{ $t("pages.cabinet.profileSettings") }}
                    </div>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="profileSettings.email"
                      :label="$t('forms.labels.newEmail')"
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="profileSettings.phone"
                      :label="$t('forms.labels.newPhone')"
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="profileSettings.firstName"
                      :label="$t('forms.labels.firstName')"
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-text-field
                      v-model="profileSettings.lastName"
                      :label="$t('forms.labels.lastName')"
                      outlined
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-autocomplete
                      v-model="profileSettings.country"
                      :items="COUNTRIES"
                      :label="$t('forms.labels.country')"
                      outlined
                      clearable
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12" class="py-0 pb-4">
                    <div class="body-1">
                      {{ $t("pages.cabinet.chatSettings") }}
                    </div>
                  </v-col>
                  <VoiceSettings
                    :chatSettings.sync="chatSettings.global"
                    type="global"
                  />
                  <VoiceSettings
                    :chatSettings.sync="chatSettings.room"
                    type="room"
                  />
                  <VoiceSettings
                    :chatSettings.sync="chatSettings.private"
                    type="private"
                  />
                </v-row>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { COUNTRIES, LOCALES } from "../../assets/helpers/enums";
import { api } from "../../assets/helpers/api";
import { ProfileSettingsParser } from "../../assets/helpers/parsers";

export default {
  name: "Cabinet",
  components: {
    VoiceSettings: () =>
      import("../../components/components/Cabinet/VoiceSettings")
  },
  data() {
    return {
      COUNTRIES,
      LOCALES,
      imgSrc: "",
      imgFile: null,
      profileSettings: null,
      chatSettings: null
    };
  },
  created() {
    this.parseDefaultData();
  },
  watch: {
    imgFile(val) {
      if (val && typeof val === "object") {
        this.imgSrc = URL.createObjectURL(val);
      } else {
        this.imgSrc = "";
      }
    }
  },
  methods: {
    parseDefaultData() {
      let profileSettings = new ProfileSettingsParser(this.$user);
      this.$set(this, "profileSettings", profileSettings.getProfileSettings);
      this.$set(this, "chatSettings", profileSettings.getChatSettings);
    },
    clickInput() {
      document.querySelector("#avatarInput").click();
    },
    clearAvatar() {
      this.imgSrc = "";
      this.profileSettings.avatarBig = "";
      this.imgFile = "";
    },
    async uploadAvatar() {
      const formData = new FormData();
      formData.append("avatarImg", this.imgFile);
      let audioId = (await api.uploader.uploadAvatar(formData)).data;
      console.log(audioId);
    },
    async changePassword() {
      await this.$openModal("ChangePassword")
        .then(() => {})
        .catch(() => {});
    },
    saveSettings() {
      this.uploadAvatar();
    }
  }
};
</script>
