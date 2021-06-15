<template>
  <div class="Cabinet">
    <v-row>
      <v-col cols="6">
        <v-card class="pa-2">
          <v-card-actions class="pt-8">
            <v-row>
              <v-col cols="12" class="py-0">
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
                  :items="$options.enums.countries"
                  :label="$t('forms.labels.country')"
                  outlined
                  clearable
                />
              </v-col>

              <v-col cols="12" class="py-0">
                <v-combobox
                  v-model="profileSettings.locale"
                  :menu-props="{ bottom: true, offsetY: true }"
                  :label="$t('forms.labels.locale')"
                  item-value="key"
                  :items="$options.enums.locales"
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
                <v-btn block>Change password</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
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
import { sounds } from "../../assets/helpers/enums";

export default {
  name: "Cabinet",
  components: {
    VoiceSettings: () => import("../../components/logic/Cabinet/VoiceSettings")
  },
  methods: {
    selectSound(target, menuToogl, sound) {
      this.$set(this.chatSettings, target, sound);
      this.visible[menuToogl] = false;
    },
    log(e) {
      console.log(e);
    }
  },
  data() {
    return {
      visible: {
        global: false,
        room: false,
        private: false
      },
      sounds,
      profileSettings: {
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
          soundSelected: sounds[0]
        },
        room: {
          isTurnedOn: false,
          autoplay: false,
          soundSelected: sounds[0]
        },
        private: {
          isTurnedOn: false,
          autoplay: false,
          soundSelected: sounds[0]
        }
      }
    };
  }
};
</script>

<style lang="scss">
.Cabinet {
}
</style>
