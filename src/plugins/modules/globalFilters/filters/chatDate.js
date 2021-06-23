import moment from "moment";

export const chatDate = value => {
  let date = moment(value);
  return date.format("YYYY-MM-DD HH:mm");
};
