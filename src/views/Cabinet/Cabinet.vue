<template>
  <div class="Cabinet">
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-card class="px-4 py-2">
          <v-card-text class="d-flex align-center justify-space-between pa-0">
            <div class="body-1">
              Profile settings
            </div>
            <v-btn @click="saveSettings">
              <v-icon>
                mdi-content-save
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-2">
          <v-card-actions class="pt-8">
            <v-row>
              <v-col cols="12" class="pt-0">
                <div class="body-1 mb-4">
                  Profile settings
                </div>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-card class="pa-4">
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-avatar width="200" height="200" class="mx-auto d-flex">
                      <img :src="imgSrc" alt="" v-if="imgSrc" />
                      <v-btn class="green" v-else icon @click="clickInput">
                        <v-icon dark>
                          mdi-image-plus
                        </v-icon>
                      </v-btn>
                      <v-btn
                        class="red"
                        icon
                        @click="clearAvatar"
                        v-show="imgSrc && hover"
                        :class="{ 'on-hover': hover }"
                        absolute
                      >
                        <v-icon dark>
                          mdi-image-remove
                        </v-icon>
                      </v-btn>
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
                <v-combobox
                  v-model="profileSettings.locale"
                  :menu-props="{ bottom: true, offsetY: true }"
                  :label="$t('forms.labels.locale')"
                  item-value="key"
                  :items="LOCALES"
                  outlined
                  clearable
                >
                  <template v-slot:selection="slotData">
                    <v-list-item-content v-text="slotData.item.title" />
                  </template>
                  <template v-slot:item="slotData">
                    <v-list-item-content v-text="slotData.item.title" />
                  </template>
                </v-combobox>
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
                <v-btn block @click="changePassword">Change password</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-2">
          <v-card-actions class="pt-8">
            <v-row>
              <v-col cols="12" class="pt-0">
                <div class="body-1 mb-4">
                  Profile settings
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
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-2">
          <v-card-actions class="pt-8">
            <v-row>
              <v-col cols="12" class="py-0">
                <div class="body-1 mb-4">
                  Chat settings
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
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { COUNTRIES, SOUNDS, LOCALES } from "../../assets/helpers/enums";
import { api } from "../../assets/helpers/api";

export default {
  name: "Cabinet",
  components: {
    VoiceSettings: () => import("../../components/logic/Cabinet/VoiceSettings")
  },
  data() {
    return {
      COUNTRIES,
      LOCALES,
      SOUNDS,
      imgSrc: "",
      imgFile: null,
      profileSettings: {
        avatarImgBig: null,
        avatarImgSmall: null,
        email: null,
        phone: null,
        firstName: null,
        lastName: null,
        country: null,
        locale: null,
        isDarkTheme: null
      },
      chatSettings: {
        global: {
          isTurnedOn: false,
          autoplay: false,
          soundSelected: SOUNDS[0]
        },
        room: {
          isTurnedOn: false,
          autoplay: false,
          soundSelected: SOUNDS[0]
        },
        private: {
          isTurnedOn: false,
          autoplay: false,
          soundSelected: SOUNDS[0]
        }
      }
    };
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
    clickInput() {
      document.querySelector("#avatarInput").click();
    },
    clearAvatar() {
      this.imgSrc = "";
      this.imgFile = "";
    },
    async uploadAvatar() {
      const formData = new FormData();
      formData.append("avatarImg", this.imgFile);
      let audioId = (await api.uploader.uploadAvatar(formData)).data;
      console.log(audioId);
    },
    changePassword() {},
    saveSettings() {
      this.uploadAvatar();
    }
  }
};
</script>

<style lang="scss">
.Cabinet {
}
</style>
