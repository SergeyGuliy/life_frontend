<template>
  <Grid v-if="roomData">
    <template #leftCol>
      <pre>{{ game }}</pre>
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

      <FSlider
        v-model="gameSettings.timePerTurn"
        :label="$t('forms.labels.timePerTurn')"
        :max="180"
        :min="10"
        :step="5"
      />
      <FSlider
        v-model="gameSettings.timeAdditional"
        :label="$t('forms.labels.timeAdditional')"
        :max="60 * 10"
        :min="60 * 1"
        :step="5"
      />
      <FSlider
        v-model="gameSettings.gameYearsCount"
        :label="$t('forms.labels.gameYearsCount')"
        :max="80"
        :min="10"
        :step="1"
      />

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
        <template #actions="{userData, isYou}">
          <UserButton
            v-if="!isYou && isRoomAdmin"
            :userId="userData?.userId"
            :roomId="roomId"
            type="kickUser"
          />
          <UserButton
            v-if="!isYou && isRoomAdmin"
            :userId="userData?.userId"
            :roomId="roomId"
            type="setAdmin"
          />
          <UserButton
            :userId="userData?.userId"
            type="writeMessage"
            v-if="!isYou"
          />
          <UserButton
            :userId="userData?.userId"
            type="addToFriend"
            v-if="!isYou"
          />
        </template>
      </UsersList>
      <pre>{{ currentDate }}</pre>
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

export default {
  name: "RoomId",

  components: {
    RoomInfo: () => import("@components/elements/Rooms/RoomInfo"),
    UsersList: () => import("@components/elements/Users/UsersList"),
    UserButton: () => import("@components/elements/Users/UserButton")
  },
  data() {
    return {
      roomData: null,
      gameSettings: {
        timePerTurn: 10,
        timeAdditional: 180,
        gameYearsCount: 40 * 12
      },
      game: null
    };
  },

  $initSocketListener() {
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
          [rooms_updateToggleLockRoom]: this.updateToggleLockRoom,
          games_gameStarted: this.gameStarted,
          games_tick: ({ currentDate, shares, cryptocurrencies }) => {
            this.currentDate = currentDate;
            this.shares = shares;
            this.cryptocurrencies = cryptocurrencies;
          },
          games_sendUserData: userData => {
            console.log(userData);
          }
        });
        return data;
      })
      .then(({ gameId }) => {
        if (!gameId) return;
        api.games.getGameById(gameId).then(data => {
          this.game = data;
        });
      })
      .catch(() => {
        this.$store.commit("user/leaveRoom");
        this.$router.push({ name: "Home" });
      });
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
    currentDate: {
      get() {
        return this.game?.gameData?.currentDate;
      },
      set(val) {
        this.game.gameData.currentDate = val;
      }
    },
    shares: {
      get() {
        return this.game?.shares;
      },
      set(val) {
        this.game.shares = val;
      }
    },
    cryptocurrencies: {
      get() {
        return this.game?.cryptocurrencies;
      },
      set(val) {
        this.game.cryptocurrencies = val;
      }
    },
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
    gameStarted(game) {
      this.game = game;
      this.roomData.gameId = game._id;
    },
    startGame() {
      api.games.startGame(this.roomId, this.gameSettings);
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
