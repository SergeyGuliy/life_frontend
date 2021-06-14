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

              <v-col cols="6" class="py-0">
                <v-switch
                  inset
                  v-model="chatSettings.globalVoice"
                  flat
                  :label="
                    chatSettings.globalVoice
                      ? $t('forms.labels.globalVoiceDisabled')
                      : $t('forms.labels.globalVoiceEnabled')
                  "
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-if="chatSettings.globalVoice"
                  :close-on-content-click="false"
                  class="lang-selector"
                  auto
                  v-model="visible.global"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item class="pa-0">
                      <ChatAudio
                        :showVoiceControls="false"
                        :file="chatSettings.globalVoiceSelected.sound"
                      >
                        <template #prepend>
                          <v-col cols="2" class="px-0">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-arrow-down</v-icon>
                            </v-btn>
                          </v-col>
                        </template>
                      </ChatAudio>
                    </v-list-item>
                  </template>
                  <v-list class="lang-selector__list">
                    <v-list-item
                      link
                      class="pa-0"
                      v-for="(item, index) in sounds.filter(
                        i => i.name !== chatSettings.globalVoiceSelected.name
                      )"
                      :key="index"
                    >
                      <ChatAudio :showVoiceControls="false" :file="item.sound">
                        <template #prepend>
                          <v-col cols="2" class="px-0">
                            <v-btn
                              icon
                              @click="
                                selectSound(
                                  'globalVoiceSelected',
                                  'global',
                                  item
                                )
                              "
                            >
                              <v-icon>mdi-alarm-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </template>
                      </ChatAudio>
                      <!--                      <v-list-item-title>{{ item.name }}</v-list-item-title>-->
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>

              <v-col cols="6" class="py-0">
                <v-switch
                  inset
                  v-model="chatSettings.roomVoice"
                  flat
                  :label="
                    chatSettings.roomVoice
                      ? $t('forms.labels.globalVoiceDisabled')
                      : $t('forms.labels.globalVoiceEnabled')
                  "
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-if="chatSettings.roomVoice"
                  :close-on-content-click="false"
                  class="lang-selector"
                  auto
                  v-model="visible.room"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item class="pa-0">
                      <ChatAudio
                        :showVoiceControls="false"
                        :file="chatSettings.roomVoiceSelected.sound"
                      >
                        <template #prepend>
                          <v-col cols="2" class="px-0">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-arrow-down</v-icon>
                            </v-btn>
                          </v-col>
                        </template>
                      </ChatAudio>
                    </v-list-item>
                  </template>
                  <v-list class="lang-selector__list">
                    <v-list-item
                      link
                      class="pa-0"
                      v-for="(item, index) in sounds.filter(
                        i => i.name !== chatSettings.roomVoiceSelected.name
                      )"
                      :key="index"
                    >
                      <ChatAudio :showVoiceControls="false" :file="item.sound">
                        <template #prepend>
                          <v-col cols="2" class="px-0">
                            <v-btn
                              icon
                              @click="
                                selectSound('roomVoiceSelected', 'room', item)
                              "
                            >
                              <v-icon>mdi-alarm-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </template>
                      </ChatAudio>
                      <!--                      <v-list-item-title>{{ item.name }}</v-list-item-title>-->
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>

              <v-col cols="6" class="py-0">
                <v-switch
                  inset
                  v-model="chatSettings.privateVoice"
                  flat
                  :label="
                    chatSettings.privateVoice
                      ? $t('forms.labels.globalVoiceDisabled')
                      : $t('forms.labels.globalVoiceEnabled')
                  "
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-if="chatSettings.privateVoice"
                  :close-on-content-click="false"
                  class="lang-selector"
                  auto
                  v-model="visible.private"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item class="pa-0">
                      <ChatAudio
                        :showVoiceControls="false"
                        :file="chatSettings.privateVoiceSelected.sound"
                      >
                        <template #prepend>
                          <v-col cols="2" class="px-0">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-arrow-down</v-icon>
                            </v-btn>
                          </v-col>
                        </template>
                      </ChatAudio>
                    </v-list-item>
                  </template>
                  <v-list class="lang-selector__list">
                    <v-list-item
                      link
                      class="pa-0"
                      v-for="(item, index) in sounds.filter(
                        i => i.name !== chatSettings.privateVoiceSelected.name
                      )"
                      :key="index"
                    >
                      <ChatAudio :showVoiceControls="false" :file="item.sound">
                        <template #prepend>
                          <v-col cols="2" class="px-0">
                            <v-btn
                              icon
                              @click="
                                selectSound(
                                  'privateVoiceSelected',
                                  'private',
                                  item
                                )
                              "
                            >
                              <v-icon>mdi-alarm-plus</v-icon>
                            </v-btn>
                          </v-col>
                        </template>
                      </ChatAudio>
                      <!--                      <v-list-item-title>{{ item.name }}</v-list-item-title>-->
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import socketMixin from "../../mixins/socketMixin";
const sounds = [
  {
    name: "message_1",
    sound: require("../../assets/sounds/message_1.mp3")
  },
  {
    name: "message_2",
    sound: require("../../assets/sounds/message_2.mp3")
  },
  {
    name: "message_3",
    sound: require("../../assets/sounds/message_3.mp3")
  },
  {
    name: "message_4",
    sound: require("../../assets/sounds/message_4.mp3")
  },
  {
    name: "message_5",
    sound: require("../../assets/sounds/message_5.mp3")
  }
];
export default {
  name: "Cabinet",
  components: {
    ChatAudio: () => import("../../components/layouts/Chat/ChatAudio")
  },
  mixins: [socketMixin],
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
        globalVoice: true,
        globalVoiceSelected: sounds[0],
        roomVoice: true,
        roomVoiceSelected: sounds[0],
        privateVoice: true,
        privateVoiceSelected: sounds[0]
      }
    };
  }
};
</script>

<style lang="scss">
.Cabinet {
}
</style>
