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
          {{ data.title }}
        </v-card-title>

        <v-card-text>
          <div class="label mb-2">
            {{ $t("modals.createRoom.passwordLabel") }}
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
            {{ $t("modals.createRoom.cancel") }}
          </v-btn>
          <v-btn color="primary" @click="enterRoom">
            {{ $t("modals.createRoom.create") }}
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
          console.dir(data);
          this.$store.commit("user/joinRoom", data.roomJoinedId);
          this.close(true);
          this.$router.push({
            name: "RoomId",
            params: { id: data.roomJoinedId }
          });
        })
        .catch(({ response }) => {
          console.dir(response.data.message);
        });
    }
  }
};
</script>
