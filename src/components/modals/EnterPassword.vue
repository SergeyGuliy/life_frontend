<template>
  <v-dialog persistent :model-value="!!component" width="500">
    <v-card class="CreateRoom">
      <v-form>
        <v-card-title class="pb-6">
          {{ $t("modals.enterRoomWithPassword") }}
        </v-card-title>

        <v-card-text>
          <div class="label mb-2">
            {{ $t("forms.labels.passwordLabel") }}
          </div>
          <v-text-field
            v-model="roomPassword"
            :type="showPassword ? 'password' : 'text'"
            @click:appendInner="showPassword = !showPassword"
            :append-inner-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
            outlined
            dense
          />
        </v-card-text>
        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="closeModal()">
            {{ $t("buttons.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="enterRoom">
            {{ $t("buttons.join") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { useModal } from "../../composable/useModal";
import { API_joinRoom } from "@api/rooms";

export default {
  name: "EnterPassword",

  setup() {
    const { data, component, closeModal } = useModal();
    return { data, component, closeModal };
  },
  data() {
    return {
      showPassword: true,
      roomPassword: "",
    };
  },
  methods: {
    enterRoom() {
      API_joinRoom(this.data.roomId, this.roomPassword)
        .then((data) => {
          this.$store.commit("user/joinRoom", data.roomJoinedId);
          this.closeModal(true);
          this.$router.push({
            name: "RoomId",
            params: { id: data.roomJoinedId },
          });
        })
        .catch(() => {});
    },
  },
};
</script>
