<template>
  <Grid :leftCol="[4]" :rightCol="[8]">
    <template #leftCol>
      <v-row>
        <v-col cols="12" class="pt-0">
          <v-card class="pa-4">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-avatar width="200" height="200" class="mx-auto d-flex">
                <v-img :src="imgSrc" alt="" v-if="imgSrc" cover />
                <v-img
                  :src="getAvatarLink(profileSettings.avatarBig)"
                  alt=""
                  cover
                  v-else-if="profileSettings.avatarBig"
                />
                <v-btn class="green" v-else icon @click="clickInput">
                  <v-icon dark> mdi-image-plus </v-icon>
                </v-btn>
                <template v-if="hover">
                  <v-btn
                    class="red"
                    icon
                    @click="clearAvatar"
                    v-if="imgSrc"
                    absolute
                  >
                    <v-icon dark> mdi-image-remove </v-icon>
                  </v-btn>
                  <v-btn
                    class="red"
                    icon
                    @click="clearAvatar"
                    v-else-if="profileSettings.avatarBig"
                    absolute
                  >
                    <v-icon dark> mdi-image-remove </v-icon>
                  </v-btn>
                </template>
              </v-avatar>
            </v-hover>
          </v-card>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-file-input
            v-if="!(imgFile || profileSettings.avatarBig)"
            id="avatarInput"
            :label="$t('forms.labels.avatarLabel')"
            outlined
            show-size
            prepend-icon=""
            append-inner-icon="mdi-camera"
            truncate-length="50"
            accept="image/png, image/jpeg, image/bmp"
            v-model="imgFile"
            hide-details
            class="mb-4"
          ></v-file-input>
          <div v-else-if="profileSettings.avatarBig" class="d-flex mb-4">
            <v-btn
              x-large
              class="flex-grow-1"
              color="error"
              @click="clearAvatar"
            >
              {{ $t("buttons.delete") }}
            </v-btn>
          </div>
          <div v-else class="d-flex mb-4">
            <v-btn
              x-large
              class="flex-grow-1 mr-1"
              color="error"
              @click="clearAvatar"
            >
              {{ $t("buttons.delete") }}
            </v-btn>
            <v-btn
              x-large
              class="flex-grow-1 ml-1"
              color="green"
              @click="uploadAvatar"
            >
              {{ $t("buttons.upload") }}
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-select
            v-model="localLocale"
            :menu-props="{ bottom: true, offsetY: true }"
            :label="$t('forms.labels.locale')"
            :items="LOCALES_WITH_KEYS"
            item-title="title"
            item-value="key"
            outlined
            hide-details
            class="mb-4"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <!--          <v-select-->
          <!--            v-model="$vuetify.theme.dark"-->
          <!--            :menu-props="{ bottom: true, offsetY: true }"-->
          <!--            :label="$t('forms.labels.theme')"-->
          <!--            :items="[true, false]"-->
          <!--            outlined-->
          <!--            class="mb-4"-->
          <!--            hide-details-->
          <!--          >-->
          <!--            <template v-slot:selection="{ item }">-->
          <!--              <v-list-item-title-->
          <!--                :item="-->
          <!--                  item ? $t('forms.labels.dark') : $t('forms.labels.light')-->
          <!--                "-->
          <!--              />-->
          <!--            </template>-->
          <!--            <template v-slot:item="{ item }">-->
          <!--              <v-list-item-title-->
          <!--                :item="-->
          <!--                  item ? $t('forms.labels.dark') : $t('forms.labels.light')-->
          <!--                "-->
          <!--              />-->
          <!--            </template>-->
          <!--          </v-select>-->
        </v-col>
        <v-col cols="12" class="py-0">
          <v-btn color="primary" large block @click="changePassword">
            {{ $t("buttons.changePassword") }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <template #rightCol>
      <v-row>
        <v-col cols="12" class="pa-0">
          <Title :title="$t('pages.cabinet.userProfile')">
            <template #actions>
              <v-btn color="green" @click="saveSettings">
                <v-icon> mdi-content-save </v-icon>
              </v-btn>
            </template>
          </Title>
        </v-col>
        <v-col cols="6">
          <v-row>
            <Title :title="$t('pages.cabinet.profileSettings')" />
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
                v-mask="'+0(000) 000-0000'"
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
            <Title :title="$t('pages.cabinet.chatSettings')" />
            <VoiceSettings
              v-model:chatSettings="chatSettings.global"
              type="global"
            />
            <VoiceSettings
              v-model:chatSettings="chatSettings.room"
              type="room"
            />
            <VoiceSettings
              v-model:chatSettings="chatSettings.private"
              type="private"
            />
          </v-row>
        </v-col>
      </v-row>
    </template>
  </Grid>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { ProfileSettingsParser } from "@utils/profileSettingsParser";
import { COUNTRIES, LOCALES_WITH_KEYS } from "@enums";
import { API_uploadAvatar } from "@api";
import { useUsers, useLocale, useUserSettings, useModal } from "@composable";
import { useStoreAuth } from "@stores";
import { getAvatarLink } from "@helpers";

const { openModal } = useModal();

export default {
  name: "Cabinet",
  components: {
    VoiceSettings: defineAsyncComponent(() =>
      import("@components/elements/Cabinet/VoiceSettings.vue")
    ),
  },

  setup() {
    const { changeLocale, currentLocale } = useLocale();
    const { updateUserSettings } = useUserSettings();
    const { myUser } = useUsers();
    const { setProfileSettings } = useStoreAuth();

    return {
      changeLocale,
      updateUserSettings,
      myUser,
      setProfileSettings,
      currentLocale,
    };
  },

  computed: {
    localLocale: {
      get() {
        return this.currentLocale.locale;
      },
      set(val) {
        this.changeLocale(val);
      },
    },
  },

  data() {
    return {
      COUNTRIES,
      LOCALES_WITH_KEYS,
      imgSrc: "",
      imgFile: null,
      profileSettings: null,
      chatSettings: null,
    };
  },
  created() {
    this.parseDefaultData();
  },

  watch: {
    myUser: {
      deep: true,
      handler() {
        this.parseDefaultData();
      },
    },
    imgFile(val) {
      if (val && typeof val === "object") {
        this.imgSrc = URL.createObjectURL(val);
      } else {
        this.imgSrc = "";
      }
    },
  },

  methods: {
    getAvatarLink,
    parseDefaultData() {
      let profileSettings = new ProfileSettingsParser(this.myUser);
      this.profileSettings = profileSettings.getProfileSettings;
      this.chatSettings = profileSettings.getChatSettings;
    },
    clickInput() {
      document.querySelector("#avatarInput").click();
    },
    clearAvatar() {
      this.imgSrc = "";
      this.profileSettings.avatarBig = "";
      this.imgFile = "";
      this.uploadAvatar();
    },
    async uploadAvatar() {
      const formData = new FormData();
      formData.append("avatarImg", this.imgFile);
      let data = await API_uploadAvatar(formData);
      this.setProfileSettings(data);
    },
    async changePassword() {
      await openModal("ChangePassword").catch(() => {});
    },
    async saveSettings() {
      await this.updateUserSettings({
        chatSettings: this.chatSettings,
        profileSettings: this.profileSettings,
      });
    },
  },
};
</script>
