export const getUserName = userData => {
  const { firstName, lastName, email } = userData;
  if (firstName || lastName) {
    return `${firstName || ""} ${lastName || ""}`;
  }
  return email;
};
