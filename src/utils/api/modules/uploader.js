import {axiosWithAuth} from "../axios";

const API_uploadVoice = async formData => axiosWithAuth.post(`api/uploader/uploadVoice`, formData)

const API_uploadAvatar = async formData => axiosWithAuth.post(`api/uploader/images/avatars`, formData)

export {
  API_uploadVoice,
  API_uploadAvatar
}
