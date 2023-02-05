<template>
  <Grid v-if="$roomData">
    <template #leftCol>
      <RoomInfo :roomData="$roomData">
        <template #actions v-if="$isRoomAdmin">
          <v-btn v-if="!$roomData.isBlocked" @click="toggleLockRoom">
            {{ $t("buttons.lockRoom") }}
          </v-btn>
          <v-btn v-else-if="$roomData.isBlocked" @click="toggleLockRoom">
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

      <v-btn @click="startGame" block v-if="$isRoomAdmin">
        {{ $t("buttons.startGame") }}
      </v-btn>
    </template>
    <template #rightCol>
      <UsersList
        :users="$usersInRoom"
        :showUserRoomInfo="true"
        :sortType="'adminFirst'"
      >
        <template #actions="{ userData, isYou }">
          <UserButton
            v-if="!isYou && $isRoomAdmin"
            :userId="userData?.userId"
            type="kickUser"
          />
          <UserButton
            v-if="!isYou && $isRoomAdmin"
            :userId="userData?.userId"
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
    </template>
  </Grid>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { API_startGame } from "@api/games";
import { API_deleteRoom, API_toggleLockRoom } from "@api/rooms";

export default {
  name: "Room",

  components: {
    RoomInfo: defineAsyncComponent(() =>
      import("@components/elements/Rooms/RoomInfo.vue")
    ),
    UsersList: defineAsyncComponent(() =>
      import("@components/elements/Users/UsersList.vue")
    ),
    UserButton: defineAsyncComponent(() =>
      import("@components/elements/Users/UserButton.vue")
    ),
  },

  data() {
    return {
      gameSettings: {
        timePerTurn: 5,
        timeAdditional: 180,
        gameYearsCount: 40 * 12,
      },
    };
  },

  methods: {
    startGame() {
      API_startGame(this.$roomId, this.gameSettings);
    },

    async toggleLockRoom() {
      await API_toggleLockRoom(this.$roomId, {
        lockState: !this.$roomData.isBlocked,
      });
    },

    async deleteRoom() {
      await API_deleteRoom(this.$roomId);
    },
  },
};
</script>
