<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <pre>{{ $v.roomData.roomPassword }}</pre>
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
// import { api } from "@api";

export default {
  name: "CreateRoom",
  mixins: [modal],

  validations: {
    roomData: {
      roomPassword: {
        required,
        wrongPassword: v => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v)
      }
    }
  },
  validationsMessages: {
    roomData: {
      roomPassword: {
        required: "Password required",
        wrongPassword: "wrong password"
      }
    }
  },

  data() {
    return {
      roomData: {
        roomName: "12312",
        roomPassword: "",
        typeOfRoom: "PUBLIC",
        minCountOfUsers: 2,
        maxCountOfUsers: 10
      }
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
      let errorObject = get(this.$v, key);
      console.log(errorObject);
      return errorObject;
    },
    async createRoom() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log(this.$v.$invalid);
        // api.rooms.create(this.roomData).then(data => {
        //   this.close(data);
        // });
      }
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
