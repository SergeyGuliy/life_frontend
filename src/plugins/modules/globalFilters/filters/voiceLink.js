export const voiceLink = voiceLink => {
  if (voiceLink) {
    return `http://localhost:3000/api/uploader/voiceMessages/${voiceLink}`;
  } else {
    return "";
  }
};
