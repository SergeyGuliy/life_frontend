import Vue from "vue";
import moment from "moment";

Vue.filter("chatDate", function(value) {
  let date = moment(value);
  return date.format("YYYY-MM-DD HH:mm");
});
