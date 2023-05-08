import { useAuth } from "@composable";

export async function refreshTokenMiddleware(to) {
  if (["Auth", "Closer"].includes(to.name)) return;

  await useAuth()
    .refreshToken()
    .catch(() => {
      console.log("refresh token");
    });
}
