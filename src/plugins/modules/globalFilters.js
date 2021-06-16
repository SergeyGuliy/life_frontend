import Vue from "vue";
import moment from "moment";

Vue.filter("chatDate", function(value) {
  let date = moment(value);
  return date.format("YYYY-MM-DD HH:mm");
});

Vue.filter("avatarLink", function(avatarId) {
  if (avatarId) {
    return `http://localhost:3000/api/uploader/images/avatars/${avatarId}`;
  } else {
    return "";
  }
});

Vue.filter("voiceLink", function(avatarId) {
  if (avatarId) {
    return `http://localhost:3000/api/uploader/voiceMessages/${avatarId}`;
  } else {
    return "";
  }
});
