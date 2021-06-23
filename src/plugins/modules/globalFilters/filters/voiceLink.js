export const voiceLink = (avatarId) => {
  if (avatarId) {
    return `http://localhost:3000/api/uploader/voiceMessages/${avatarId}`;
  } else {
    return "";
  }
}
