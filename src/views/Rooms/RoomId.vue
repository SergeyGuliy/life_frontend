<template>
  <Grid v-if="roomData">
    <template #leftCol>
      <RoomInfo
        :roomData="{
          ...roomData,
          usersInRoomLength: usersInRoom.length
        }"
      >
        <template #actions v-if="isRoomAdmin">
          <v-btn v-if="!roomData.isBlocked" @click="toggleLockRoom">
            {{ $t("buttons.lockRoom") }}
          </v-btn>
          <v-btn v-else-if="roomData.isBlocked" @click="toggleLockRoom">
            {{ $t("buttons.unLockRoom") }}
          </v-btn>
          <v-btn @click="deleteRoom">
            {{ $t("buttons.deleteRoom") }}
          </v-btn>
        </template>
      </RoomInfo>
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
                <div class="label mb-2">
                  {{ $t("forms.labels.typeOfRoom") }}
                </div>
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
              {{ $t("buttons.cancel") }}
            </v-btn>
            <v-btn color="primary" @click="createRoom">
              {{ $t("buttons.create") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-btn @click="startGame" block v-if="isRoomAdmin">
        {{ $t("buttons.startGame") }}
      </v-btn>
    </template>
    <template #rightCol>
      <UsersList
        :users="usersInRoom"
        :showUserRoomInfo="true"
        :sortType="'adminFirst'"
      >
        <template #actions="{userData}">
          <v-btn
            v-if="isRoomAdmin && userData.userId !== $user.userId"
            @click="kickUserFromRoom(userData.userId)"
          >
            {{ $t("buttons.kickUser") }}
          </v-btn>
          <v-btn
            v-if="isRoomAdmin && userData.userId !== $user.userId"
            @click="setNewRoomAdmin(userData.userId)"
          >
            {{ $t("buttons.setAdmin") }}
          </v-btn>
          <v-btn
            v-if="userData.userId !== $user.userId"
            @click="writeMessageToUser(userData.userId)"
          >
            {{ $t("buttons.writeMessage") }}
          </v-btn>
          <v-btn
            v-if="userData.userId !== $user.userId"
            @click="addUserToFriendsList(userData.userId)"
          >
            {{ $t("buttons.addToFriend") }}
          </v-btn>
        </template>
      </UsersList>
    </template>
  </Grid>
</template>

<script>
import { api } from "@api";

import {
  rooms_userConnectsRoom,
  rooms_updateUsersListInRoom,
  rooms_updateRoomAdmin,
  rooms_userKickedFromRoom,
  rooms_updateToggleLockRoom
} from "@constants/ws/rooms.js";

import { $usersActions } from "@composable/$usersActions";
const { writeMessageToUser, addUserToFriendsList } = $usersActions();

export default {
  name: "RoomId",

  components: {
    RoomInfo: () => import("@components/elements/Rooms/RoomInfo"),
    UsersList: () => import("@components/elements/Users/UsersList")
  },
  data() {
    return {
      roomData: null,
      roomSettings: {}
    };
  },
  async mounted() {
    this.$initSocketListener(this.intiComponent);
  },

  async beforeRouteLeave(to, from, next) {
    if (!this.$user || +this.$user?.roomJoinedId !== this.roomId) {
      next();
    } else {
      await this.$openModal("Promt", {
        title: this.$t("modals.wantLeaveRoom"),
        submit: this.$t("buttons.leave"),
        cancel: this.$t("buttons.cancel")
      })
        .then(async () => {
          await this.$store.dispatch("user/leaveRoom");
          next();
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {
    isRoomAdmin() {
      return this.$user.roomCreatedId === this.roomId;
    },
    usersInRoom() {
      return this.roomData.usersInRoom;
    },
    roomId() {
      return +this.$route.params.id;
    }
  },
  methods: {
    writeMessageToUser,
    addUserToFriendsList,
    startGame() {
      console.log("startGame");
    },
    async intiComponent() {
      api.rooms
        .getRoomById(this.roomId)
        .then(data => {
          this.roomData = data;
          this.$socket.client.emit(rooms_userConnectsRoom, {
            userId: this.$user.userId,
            roomId: this.roomData.roomId
          });
          this.$socketInit({
            [rooms_updateUsersListInRoom]: this.updateUserListInRoom,
            [rooms_updateRoomAdmin]: this.updateRoomAdmin,
            [rooms_userKickedFromRoom]: this.userKickedFromRoom,
            [rooms_updateToggleLockRoom]: this.updateToggleLockRoom
          });
        })
        .catch(() => {
          this.$store.commit("user/leaveRoom");
          this.$router.push({ name: "Home" });
        });
    },

    async userKickedFromRoom(kickUserId) {
      let indexKickedUserId = this.roomData.usersInRoom.findIndex(
        user => +user.userId === +kickUserId
      );
      const isKickedUserMe = +this.$user.userId === +kickUserId;
      this.$delete(this.roomData.usersInRoom, indexKickedUserId);

      if (isKickedUserMe) {
        this.$store.commit("user/leaveRoom");
        await this.$router.push({ name: "Home" });
      }
    },

    updateToggleLockRoom(lockState) {
      this.roomData.isBlocked = lockState;
    },

    updateUserListInRoom(usersInRoom) {
      this.roomData.usersInRoom = usersInRoom;
    },
    updateRoomAdmin(newAdmin) {
      let indexOldAdmin = this.roomData.usersInRoom.findIndex(
        user => typeof user.roomCreatedId === "number"
      );
      this.$set(
        this.roomData.usersInRoom[indexOldAdmin],
        "roomCreatedId",
        null
      );

      let indexNewAdmin = this.roomData.usersInRoom.findIndex(
        user => user.userId === newAdmin.userId
      );
      this.$set(
        this.roomData.usersInRoom[indexNewAdmin],
        "roomCreatedId",
        this.roomId
      );

      if (newAdmin.userId === this.$user.userId) {
        this.$store.commit("user/setRoomId", this.roomId);
      } else {
        this.$store.commit("user/setRoomId", null);
      }
    },
    async kickUserFromRoom(userId) {
      await api.rooms.kickUserFromRoom(this.roomId, userId);
    },
    async setNewRoomAdmin(userId) {
      await api.rooms.setNewRoomAdmin(this.roomId, userId);
    },
    async toggleLockRoom() {
      await api.rooms.toggleLockRoom(this.roomId, {
        lockState: !this.roomData.isBlocked
      });
    },
    async deleteRoom() {
      await api.rooms.deleteRoom(this.roomId);
    }
  }
};
</script>
