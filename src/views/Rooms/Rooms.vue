<template>
  <div class="Rooms container__inner">
    Rooms
    <pre>{{ $store.getters["dictionaries/getUsers"][2] }}</pre>
  </div>
</template>

<script>
export default {
  name: "Rooms",
  components: {},
  data() {
    return {};
  },
  created() {
    setTimeout(() => {
      this.$dictionares.updateUserData({
        createdAt: "2021-05-10T21:26:38.520Z",
        updatedAt: "2021-05-10T23:01:39.585Z",
        userId: 2,
        email: "te111st.user1@gmail.com",
        phone: "+2(222) 222-2211",
        password:
          "$2b$04$wyYgt/YJe68MWwjs1yMeQuCJpsrRsRs8DwfPYkLxuWfqXELLJbmsO",
        role: "CASUAL",
        userOnlineStatus: "OFFLINE",
        userGameStatus: "NOT_IN_GAME",
        firstName: null,
        lastName: null,
        country: "MRT1111",
        refreshToken: "8c967daf-9da4-4a1f-8a2a-491834e401d1",
        isDarkTheme: true,
        createdRoomId: null,
        roomJoinedId: null
      });
    }, 3000);
  }
};
</script>

<style lang="scss">
.Rooms {
}
</style>
