import Vue from "vue";

Vue.mixin({
  computed: {
    $user() {
      return this.$store.state.user?.user;
    },
    $users() {
      return this.$store.state.dictionaries?.users;
    },
    $chats() {
      return this.$store.state.chats?.chats;
    },
    $chatTabs() {
      return Object.keys(this.$chats);
    },
    $friendsRequests() {
      return this.$store.state.friends?.friends;
    },
    $friends() {
      return this.$friendsRequests.map(i => {
        const { friendshipReceiver, friendshipSender } = i;
        return +friendshipReceiver.userId === +this.$user.userId
          ? friendshipSender
          : friendshipReceiver;
      });
    },
    $connects() {
      return this.$store.state.friends?.connects;
    }
  },
  methods: {
    $openModal(modalName, data = {}) {
      this.$store.dispatch("modals/setModal", {
        component: modalName,
        data: data
      });

      return new Promise(function(resolve, reject) {
        let callback = data => {
          if (data.detail !== null) {
            resolve(data.detail);
          } else {
            reject();
          }
          window.removeEventListener("modalClose", callback);
        };
        window.addEventListener("modalClose", callback);
      });
    },
    $noti() {
      function error(message) {
        this.$notify({
          group: "foo",
          type: "error",
          title: message
        });
      }

      function warning(message) {
        this.$notify({
          group: "foo",
          type: "warn",
          title: message
        });
      }

      function success(message) {
        this.$notify({
          group: "foo",
          type: "success",
          title: message
        });
      }

      function info(message) {
        this.$notify({
          group: "foo",
          type: "info",
          title: message
        });
      }
      return {
        error,
        warning,
        success,
        info
      };
    },

    $initSocketListener(callback) {
      function wrappedCallback() {
        if (!this.$socket.connected) return;
        callback();
      }
      wrappedCallback();
      this.$watch("$socket.connected", wrappedCallback);
    },

    $socketInit(socketObject) {
      const socketEntries = Object.entries(socketObject);

      socketEntries.forEach(([socketKey, socketCallback]) => {
        this.$socket.client.on(socketKey, socketCallback);

        this.$on("hook:destroyed", () => {
          this.$socket.client.off(socketKey, socketCallback);
        });
      });
    },

    $busInit(busObject) {
      const busEntries = Object.entries(busObject);

      busEntries.forEach(([busKey, busCallback]) => {
        this.$bus.on(busKey, busCallback);

        this.$on("hook:destroyed", () => {
          this.$bus.off(busKey, busCallback);
        });
      });
    }
  }
});
