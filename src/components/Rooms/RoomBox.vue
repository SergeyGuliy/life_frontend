<template>
  <v-card class="RoomBox pa-2 mb-2">
    <RoomInfo :roomData="roomData" />
    <v-card-actions>
      <v-btn block @click="joinRoom(roomData)">
        Join
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { api } from "../../assets/helpers/api";

export default {
  name: "RoomBox",
  components: {
    RoomInfo: () => import("./RoomInfo")
  },
  props: {
    roomData: {
      required: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    async joinRoom(roomData) {
      let { typeOfRoom, roomName, roomId } = roomData;
      if (typeOfRoom === "PRIVATE") {
        await this.$openModal("EnterPassword", {
          title: "To enter room you need to input its password",
          submit: "enter",
          cancel: "cancel",
          roomId
        })
          .then(() => {})
          .catch(() => {});
      } else {
        await this.$openModal("Promt", {
          title: `Enter room ${roomName} ?`,
          submit: "leave",
          cancel: "cancel"
        })
          .then(() =>
            api.rooms.joinRoom(roomId).then(({ data }) => {
              this.$store.commit("user/joinRoom", data.roomJoinedId);
              this.$router.push({
                name: "RoomId",
                params: { id: data.roomJoinedId }
              });
            })
          )
          .catch(({ response }) => {
            console.dir(response.data.message);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.RoomBox {
}
</style>
