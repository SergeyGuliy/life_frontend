export default {
  methods: {
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
    }
  }
};
