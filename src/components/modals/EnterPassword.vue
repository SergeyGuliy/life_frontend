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
          {{ $t("modals.enterRoomWithPassword") }}
        </v-card-title>

        <v-card-text>
          <div class="label mb-2">
            {{ $t("forms.labels.passwordLabel") }}
          </div>
          <v-text-field
            v-model="roomPassword"
            :type="showPassword ? 'password' : 'text'"
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ? 'mdi-lock' : 'mdi-lock-open'"
            outlined
            dense
          />
        </v-card-text>
        <v-card-actions class="py-4 px-6">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="close()">
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
import modal from "../../mixins/modal";
import { api } from "../../assets/helpers/api";

export default {
  name: "EnterPassword",
  mixins: [modal],
  data() {
    return {
      showPassword: true,
      roomPassword: ""
    };
  },
  methods: {
    enterRoom() {
      api.rooms
        .joinRoom(this.data.roomId, this.roomPassword)
        .then(({ data }) => {
          this.$store.commit("user/joinRoom", data.roomJoinedId);
          this.close(true);
          this.$router.push({
            name: "RoomId",
            params: { id: data.roomJoinedId }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
