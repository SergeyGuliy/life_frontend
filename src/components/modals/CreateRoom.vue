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
                :error="$v_getErrorMessage('roomData.roomName')"
                v-model="roomData.roomName"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="d-flex">
                <FSwitch
                  v-model="calculatedTypeOfRoom"
                  :label="$t('forms.labels.typeOfRoom')"
                  :valueText="getSwitchLabel"
                />
              </div>
            </v-col>
            <v-col cols="12" class="py-0" v-if="isRoomPublic">
              <FTextPassword
                required
                :error="$v_getErrorMessage('roomData.roomPassword')"
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

import modal from "@mixins/modal";
import { api } from "@api";
import { ROOM_TYPES } from "@enums/index";

export default {
  name: "CreateRoom",

  validations: {},
  validationsMessages: {},

  mixins: [modal],

  beforeCreate() {
    this.$v_setup(
      "roomData",
      {
        roomName: { required },
        roomPassword: {
          required: v => this.roomData.typeOfRoom === ROOM_TYPES.PUBLIC || !!v,
          wrongPassword: v =>
            this.roomData.typeOfRoom === ROOM_TYPES.PUBLIC ||
            /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v)
        }
      },
      {
        roomName: { required: "Room Name required" },
        roomPassword: {
          required: "Password required",
          wrongPassword: "wrong password"
        }
      },
      {
        roomName: "",
        roomPassword: "",
        typeOfRoom: ROOM_TYPES.PUBLIC,
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
    getSwitchLabel() {
      return this.$t(`enums.${this.calculatedTypeOfRoom}`);
    },
    isRoomPublic() {
      return this.roomData.typeOfRoom !== ROOM_TYPES.PUBLIC;
    },

    calculatedTypeOfRoom: {
      get() {
        return this.roomData.typeOfRoom === ROOM_TYPES.PUBLIC;
      },
      set(val) {
        this.roomData.typeOfRoom = val ? ROOM_TYPES.PUBLIC : ROOM_TYPES.PRIVATE;
      }
    }
  },
  methods: {
    async createRoom() {
      this.$v_validate(() => {
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
