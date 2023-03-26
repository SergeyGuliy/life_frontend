import moment from "moment";

const format = "YYYY-MM-DD HH:mm";
export const getChatDate = (value) => moment(value).format(format);
