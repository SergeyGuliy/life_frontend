<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="CreateRoom">
      <v-form>
        <v-card-title class="pb-6">
          {{ $t("modals.createRoom") }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-0">
              <FTextField
                :label="$t('forms.labels.nameRoomLabel')"
                :error="getErrorMessage('roomData.roomName')"
                v-model="roomData.roomName"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="d-flex">
                <FSwitch
                  v-model="calculatedTypeOfRoom"
                  :label="$t('forms.labels.typeOfRoom')"
                  :valueText="
                    calculatedTypeOfRoom
                      ? $t('enums.PUBLIC')
                      : $t('enums.PRIVATE')
                  "
                />
              </div>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
              v-if="roomData.typeOfRoom !== 'PUBLIC'"
            >
              <FTextPassword
                required
                :error="getErrorMessage('roomData.roomPassword')"
                :label="$t('forms.labels.passwordLabel')"
                v-model="roomData.roomPassword"
              />
            </v-col>
            <v-col class="py-0">
              <FRange
                :minValue.sync="roomData.minCountOfUsers"
                :maxValue.sync="roomData.maxCountOfUsers"
                :label="$t('forms.labels.countOfUsers')"
                :max="10"
                :min="2"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
            {{ $t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="createRoom">
            {{ $t("buttons.create") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { get } from "lodash";

import modal from "@mixins/modal";
import { api } from "@api";

export default {
  name: "CreateRoom",

  validations: {},
  validationsMessages: {},

  mixins: [modal],

  beforeCreate() {
    this.$vuelidate_setup(
      "roomData",
      {
        roomName: {
          required
        },
        roomPassword: {
          required: v => this.roomData.typeOfRoom === "PUBLIC" || !!v,
          wrongPassword: v =>
            this.roomData.typeOfRoom === "PUBLIC" ||
            /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v)
        }
      },
      {
        roomName: {
          required: "Room Name required"
        },
        roomPassword: {
          required: "Password required",
          wrongPassword: "wrong password"
        }
      },
      {
        roomName: "",
        roomPassword: "",
        typeOfRoom: "PUBLIC",
        minCountOfUsers: 2,
        maxCountOfUsers: 10
      }
    );
  },

  data() {
    return {
      roomData: null
    };
  },
  watch: {
    "roomData.typeOfRoom"(val) {
      if (val) {
        this.roomData.roomPassword = "";
      }
    }
  },
  computed: {
    calculatedTypeOfRoom: {
      get() {
        return this.roomData.typeOfRoom === "PUBLIC";
      },
      set(val) {
        this.roomData.typeOfRoom = val ? "PUBLIC" : "PRIVATE";
      }
    }
  },
  methods: {
    getErrorMessage(key) {
      if (!this.$v.$dirty) return "";

      let errorObject = get(this.$v, key, {});
      let errorMessagesObject = get(this.$options.validationsMessages, key, {});

      const filteredErrorMessages = Object.fromEntries(
        Object.entries(errorObject).filter(i => i[0][0] !== "$")
      );
      const firstMessage = Object.entries(filteredErrorMessages)
        .map(([errorCode, errorStatus]) => {
          if (typeof errorStatus === "boolean" && !errorStatus) {
            return errorMessagesObject[errorCode];
          }
        })
        .find(i => !!i);

      return firstMessage || "";
    },
    async createRoom() {
      this.$vuelidate(() => {
        api.rooms.create(this.roomData).then(data => {
          this.close(data);
        });
      });
    }
  }
};
</script>

<style lang="scss">
.CreateRoom {
  .v-input__slider > .v-input__control .v-input__slot {
    display: block;
  }
}
</style>
