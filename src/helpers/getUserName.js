export const getUserName = (userData) => {
  if (!userData) return "";
  const { firstName, lastName, email } = userData;
  if (firstName || lastName) {
    return `${firstName || ""} ${lastName || ""}`;
  }
  return email;
};
