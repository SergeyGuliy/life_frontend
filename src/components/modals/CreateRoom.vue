<template>
  <v-dialog
    persistent
    :value="!!component"
    width="500"
    @click:outside.prevent.stop="close()"
  >
    <v-card class="CreateRoom">
      <v-form ref="createRoom">
        <v-card-title class="pb-6">
          {{ $t("modals.createRoom") }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-0">
              <div class="label mb-2">
                {{ $t("forms.labels.nameRoomLabel") }}
              </div>
              <v-text-field dense outlined v-model="roomData.roomName" />
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="label mb-2">{{ $t("forms.labels.typeOfRoom") }}</div>
              <div class="d-flex">
                <v-switch
                  inset
                  class="mt-0 mb-6 ml-2"
                  v-model="calculatedTypeOfRoom"
                  :label="
                    calculatedTypeOfRoom
                      ? $t('enums.PUBLIC')
                      : $t('enums.PRIVATE')
                  "
                  color="blue"
                  hide-details
                />
              </div>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
              v-if="roomData.typeOfRoom !== 'PUBLIC'"
            >
              <div class="label mb-2">
                {{ $t("forms.labels.passwordLabel") }}
              </div>
              <v-text-field
                v-model="roomData.roomPassword"
                :type="showPassword ? 'password' : 'text'"
                :rules="rules.password"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
                outlined
                dense
              />
            </v-col>
            <v-col class="py-0">
              <div class="label mb-2">
                {{ $t("forms.labels.countOfUsers") }}
              </div>
              <v-range-slider
                v-model="calculatedCountUsers"
                outlined
                :max="max"
                :min="min"
                hide-details
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    outlined
                    dense
                    disabled
                    :label="$t('misc.min')"
                    :value="calculatedCountUsers[0]"
                    class="mt-0 pt-0 mr-3"
                    hide-details
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    outlined
                    dense
                    disabled
                    :label="$t('misc.max')"
                    :value="calculatedCountUsers[1]"
                    class="mt-0 pt-0 ml-3"
                    hide-details
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
            {{ $t("btns.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="createRoom">
            {{ $t("btns.create") }}
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
  name: "CreateRoom",
  mixins: [modal],
  data() {
    return {
      roomData: {
        roomName: "12312",
        roomPassword: "",
        typeOfRoom: "PUBLIC",
        minCountOfUsers: 2,
        maxCountOfUsers: 10
      },
      rules: {
        password: [
          v => !!v || "E-mail is required",
          v => /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v) || "wrong password"
        ]
      },
      showPassword: true,
      min: 2,
      max: 10
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
    calculatedCountUsers: {
      get() {
        return [this.roomData.minCountOfUsers, this.roomData.maxCountOfUsers];
      },
      set(val) {
        this.roomData.minCountOfUsers = Math.min(val[0], val[1]);
        this.roomData.maxCountOfUsers = Math.max(val[0], val[1]);
      }
    },
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
    async createRoom() {
      if (this.$refs.createRoom.validate()) {
        const { data } = await api.rooms.create(this.roomData);
        this.close(data);
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
