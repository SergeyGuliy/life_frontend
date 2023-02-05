export const avatarLink = (avatarId) => {
  if (avatarId) {
    return `http://localhost:3000/api/uploader/images/avatars/${avatarId}`;
  } else {
    return "";
  }
};
