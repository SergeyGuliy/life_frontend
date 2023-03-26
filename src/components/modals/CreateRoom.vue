<template>
  <v-dialog persistent :model-value="!!component" width="500">
    <v-card class="CreateRoom">
      <v-form>
        <v-card-title class="pb-6">
          {{ t("modals.createRoom") }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-0">
              <FTextField
                :label="t('forms.labels.nameRoomLabel')"
                :error="$v_getErrorMessage('roomName')"
                v-model="roomData.roomName"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <div class="d-flex">
                <FSwitch
                  v-model="calculatedTypeOfRoom"
                  :label="t('forms.labels.typeOfRoom')"
                  :valueText="getSwitchLabel"
                />
              </div>
            </v-col>
            <v-col cols="12" class="py-0" v-if="isRoomPublic">
              <FTextPassword
                required
                :error="$v_getErrorMessage('roomPassword')"
                :label="t('forms.labels.passwordLabel')"
                v-model="roomData.roomPassword"
              />
            </v-col>
            <v-col class="py-0">
              <FRange
                v-model:minValue="roomData.minCountOfUsers"
                v-model:maxValue="roomData.maxCountOfUsers"
                :label="t('forms.labels.countOfUsers')"
                :max="10"
                :min="1"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeModal()">
            {{ t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="createRoom">
            {{ t("buttons.create") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

import { required } from "@vuelidate/validators";
import { ROOM_TYPES } from "@enums/index.mjs";
import { API_create } from "@api";
import { useModal, useMyVuelidate, useLocale } from "@composable";
import { helpers } from "@vuelidate/validators";

const { data, component, closeModal } = useModal();
const { t } = useLocale();

const roomData = reactive({
  roomName: "",
  roomPassword: "",
  typeOfRoom: ROOM_TYPES.PUBLIC,
  minCountOfUsers: 1,
  maxCountOfUsers: 10,
});
const validations = {
  roomName: {
    required: helpers.withMessage("Room Name required", required),
  },
  roomPassword: {
    required: helpers.withMessage(
      "Password required",
      (v) => roomData.typeOfRoom === ROOM_TYPES.PUBLIC || !!v
    ),
    wrongPassword: helpers.withMessage(
      "wrong password",
      (v) =>
        roomData.typeOfRoom === ROOM_TYPES.PUBLIC ||
        /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/.test(v)
    ),
  },
};
const { $v_validate, $v_getErrorMessage } = useMyVuelidate(
  validations,
  roomData
);

watch(roomData.typeOfRoom, async (val) => {
  if (!val) return;
  roomData.roomPassword = "";
});

const getSwitchLabel = computed(() => t(`enums.${calculatedTypeOfRoom.value}`));
const isRoomPublic = computed(() => roomData.typeOfRoom !== ROOM_TYPES.PUBLIC);
const calculatedTypeOfRoom = computed({
  get: () => roomData.typeOfRoom === ROOM_TYPES.PUBLIC,
  set: (val) =>
    (roomData.typeOfRoom = val ? ROOM_TYPES.PUBLIC : ROOM_TYPES.PRIVATE),
});

const createRoom = () =>
  $v_validate(() => {
    API_create(roomData).then((data) => closeModal(data));
  });
</script>

<style lang="scss">
.CreateRoom {
  .v-input__slider > .v-input__control .v-input__slot {
    display: block;
  }
}
</style>
